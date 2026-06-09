export default async (request, context) => {
  const url = new URL(request.url);
  
  // Extract the property ID from the path (e.g. /ficha/123 -> 123)
  const idMatch = url.pathname.match(/\/ficha\/([^/]+)/);
  if (!idMatch) {
    return; // Proceed to serve the static asset normally
  }
  const propertyId = idMatch[1];
  
  // Retrieve environment variables (configured in Netlify dashboard)
  const supabaseUrl = Deno.env.get("VITE_SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY");
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase env variables missing in Edge Function context.");
    return; 
  }

  // Detect if the request is whitelabel/neutral
  const isWhitelabel = 
    url.hostname.includes("anonimas") || 
    url.hostname.includes("listado-inmuebles") || 
    url.searchParams.get("whitelabel") === "true" ||
    url.searchParams.get("neutro") === "true";
  
  try {
    // Query Supabase directly via the REST API for maximum speed
    const response = await fetch(
      `${supabaseUrl}/rest/v1/properties?id=eq.${propertyId}&select=*`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      }
    );
    
    if (!response.ok) {
      return;
    }
    
    const data = await response.json();
    if (!data || data.length === 0) {
      return;
    }
    
    const property = data[0];
    
    // Title: only the property title if whitelabel
    const cleanTitle = isWhitelabel 
      ? property.titulo 
      : `${property.titulo} - Ficha Inmobiliaria`;
    
    // Description: clean extract, omit "Caramello" if whitelabel
    let cleanDesc = "";
    if (property.descripcion) {
      let desc = property.descripcion;
      if (isWhitelabel) {
        desc = desc
          .replace(/caramello\s*propiedades/gi, "")
          .replace(/caramello/gi, "")
          .replace(/\s+/g, " ")
          .trim();
      }
      cleanDesc = desc.slice(0, 150) + (desc.length > 150 ? "..." : "");
    } else {
      cleanDesc = `Ficha técnica de ${property.tipo} en ${property.operacion}. Consulte detalles.`;
    }
      
    let imageUrl = property.imagenes?.[0] || "";
    // Transform image URL to request 600x315 size using Supabase Image Transformation
    if (imageUrl.includes("/storage/v1/object/public/")) {
      imageUrl = imageUrl.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/") + "?width=600&height=315&resize=cover";
    }

    // Fetch the original index.html from Netlify CDN
    const res = await context.next();
    const html = await res.text();
    
    // Construct the customized metadata tags
    let ogTags = `
      <title>${cleanTitle}</title>
      <meta name="description" content="${cleanDesc}" />
      <meta property="og:title" content="${cleanTitle}" />
      <meta property="og:description" content="${cleanDesc}" />
      <meta property="og:image" content="${imageUrl}" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="315" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${cleanTitle}" />
      <meta name="twitter:description" content="${cleanDesc}" />
      <meta name="twitter:image" content="${imageUrl}" />
      <meta property="og:url" content="${request.url}" />
      <meta name="twitter:url" content="${request.url}" />
    `;

    if (!isWhitelabel) {
      ogTags += `
        <meta property="og:site_name" content="Caramello Propiedades" />
        <meta name="author" content="Caramello Propiedades" />
      `;
    }
    
    // Clean up standard/static meta tags to avoid conflicts
    let modifiedHtml = html
      .replace(/<title>[^<]*<\/title>/gi, "")
      .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
      .replace(/<meta\s+property=["']og:[^"']*["'][^>]*>/gi, "")
      .replace(/<meta\s+name=["']twitter:[^"']*["'][^>]*>/gi, "");

    if (isWhitelabel) {
      // Remove author, canonical and JSON-LD schema for whitelabel to avoid brand leakage
      modifiedHtml = modifiedHtml
        .replace(/<meta\s+name=["']author["'][^>]*>/gi, "")
        .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
        .replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, "");
    }
    
    // Inject metadata into index.html head
    modifiedHtml = modifiedHtml.replace("<head>", `<head>${ogTags}`);
      
    return new Response(modifiedHtml, {
      headers: {
        ...Object.fromEntries(res.headers.entries()),
        "content-type": "text/html; charset=utf-8"
      }
    });
  } catch (error) {
    console.error("Error in Edge Function:", error);
    return; // Fallback to serving the standard page
  }
};
