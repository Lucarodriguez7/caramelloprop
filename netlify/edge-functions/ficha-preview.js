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

  // Detect if user agent is a social media / crawler bot (Meta/WhatsApp/Facebot/Twitter/etc.)
  const userAgent = request.headers.get("user-agent") || "";
  const isSocialBot = /facebookexternalhit|whatsapp|facebot|twitterbot|linkedinbot/i.test(userAgent);

  // Detect if the request is whitelabel/neutral
  const isWhitelabel = 
    url.hostname.includes("anonimas") || 
    url.hostname.includes("listado-inmuebles") || 
    url.searchParams.get("whitelabel") === "true" ||
    url.searchParams.get("neutro") === "true";
  
  try {
    let property = null;

    try {
      // Query Supabase directly via the REST API for maximum speed.
      // Set a generic browser User-Agent when fetching outbound to avoid potential blockings.
      const response = await fetch(
        `${supabaseUrl}/rest/v1/properties?id=eq.${propertyId}&select=*`,
        {
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          property = data[0];
        }
      }
    } catch (err) {
      console.error("Error fetching from Supabase:", err);
    }

    // If it's a social bot, we must serve the Open Graph HTML even if the property wasn't found.
    // For regular users, if the property is missing, we fallback to serving the SPA page normally.
    if (!property && !isSocialBot) {
      return; 
    }
    
    // Title: only the property title if whitelabel/bot
    const cleanTitle = property
      ? (isWhitelabel ? property.titulo : `${property.titulo} - Ficha Inmobiliaria`)
      : "Propiedad - Catálogo Inmobiliario";
    
    // Description: clean extract, omit "Caramello" if whitelabel/bot
    let cleanDesc = "";
    if (property && property.descripcion) {
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
      cleanDesc = property
        ? `Ficha técnica de ${property.tipo} en ${property.operacion}. Consulte detalles.`
        : "Consulte los detalles de esta propiedad en el catálogo inmobiliario.";
    }
    let imageUrl = property?.imagenes?.[0] || "";
    // Transform image URL to request 600x315 size using Supabase Image Transformation
    if (imageUrl && imageUrl.includes("/storage/v1/object/public/")) {
      imageUrl = imageUrl.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/") + "?width=600&height=315&resize=cover";
    }

    // Read index.html base cleanly from origin, bypassing context.next() to avoid Range header 206 Partial Content.
    const originUrl = new URL("/", request.url);
    const originResponse = await fetch(originUrl.toString());
    if (!originResponse.ok) {
      console.warn("Failed to fetch base index.html from origin:", originResponse.status);
      return; // Fallback to serving the standard page
    }
    const html = await originResponse.text();
    
    // Construct the customized metadata tags
    let ogTags = `
      <title>${cleanTitle}</title>
      <meta name="description" content="${cleanDesc}" />
      <meta property="og:title" content="${cleanTitle}" />
      <meta property="og:description" content="${cleanDesc}" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${cleanTitle}" />
      <meta name="twitter:description" content="${cleanDesc}" />
      <meta property="og:url" content="${request.url}" />
      <meta name="twitter:url" content="${request.url}" />
    `;

    if (imageUrl) {
      ogTags += `
        <meta property="og:image" content="${imageUrl}" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <meta name="twitter:image" content="${imageUrl}" />
      `;
    }

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
      status: 200, // Strictly return status 200 OK (no 206 Partial Content)
      headers: { 
        "content-type": "text/html; charset=utf-8" 
      }
    });
  } catch (error) {
    console.error("Error in Edge Function:", error);
    return; // Fallback to serving the standard page
  }
};
