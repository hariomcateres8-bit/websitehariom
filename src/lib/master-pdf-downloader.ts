import {
  DISH_CATALOG,
  PACKAGES,
  COMPANY_INFO,
  TERMS_AND_CONDITIONS,
  EXCLUSION_RATES,
  CONTACT,
  getMergedDishCatalog,
  getMergedPackages,
} from "./menu-data";
import { getCustomDishes, getCustomPackages } from "./admin-store";
import { HARIOM_LOGO_SVG_DATA_URI } from "@/components/hariom-logo";
import { toast } from "sonner";

export async function downloadMasterMenuPdf() {
  const toastId = toast.loading("Generating Hariom Caterers Master Menu PDF...");

  try {
    const { jsPDF } = await import("jspdf");
    const html2canvas = (await import("html2canvas")).default;

    // Create temporary hidden container
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.width = "794px"; // A4 width at 96 DPI
    container.style.backgroundColor = "#FFFFFF";
    container.style.zIndex = "-100";
    document.body.appendChild(container);

    // Build pages using admin custom dishes catalog if present
    const catalog = getMergedDishCatalog();
    const categories =
      Object.keys(catalog).length > 0 ? Object.keys(catalog) : Object.keys(DISH_CATALOG);
    const activeCatalog = Object.keys(catalog).length > 0 ? catalog : DISH_CATALOG;
    const categoriesPerPage = 5; // Clean spacing per page
    const totalCatalogPages = Math.ceil(categories.length / categoriesPerPage);

    let html = "";

    // Cover Page
    html += `
      <div id="master-pdf-page-cover" style="width:794px; height:1123px; padding:40px; box-sizing:border-box; background:#FFFDF9; border:12px double #991B1B; display:flex; flex-direction:column; justify-between; font-family:sans-serif; text-align:center;">
        <div style="margin-top:20px;">
          <img src="${HARIOM_LOGO_SVG_DATA_URI}" style="height:100px; margin:0 auto; display:block;" />
          <div style="margin-top:25px; inline-block; padding:6px 20px; background:#15803D; color:#FFFFFF; border-radius:30px; font-weight:bold; font-size:14px; letter-spacing:1px; display:inline-flex; align-items:center; gap:8px;">
            <span style="width:12px; height:12px; border-radius:50%; background:#FFFFFF; display:inline-block;"></span>
            100% PURE VEGETARIAN CATERING
          </div>
          <h1 style="color:#7F1D1D; font-size:32px; font-weight:900; margin-top:30px; text-transform:uppercase; letter-spacing:1px;">
            OFFICIAL MASTER MENU CATALOG
          </h1>
          <p style="color:#B45309; font-size:16px; font-weight:bold; margin-top:5px; text-transform:uppercase;">
            ${COMPANY_INFO.tagline}
          </p>
        </div>

        <div style="background:#FFF8ED; border:2px solid #F59E0B; border-radius:16px; padding:30px; text-align:left; margin:30px 0;">
          <h2 style="color:#7F1D1D; font-size:18px; font-weight:bold; border-bottom:2px solid #F59E0B; padding-bottom:8px; margin-bottom:15px; text-transform:uppercase;">
            About Hariom Caterers
          </h2>
          <p style="color:#374151; font-size:13px; line-height:1.7;">
            ${COMPANY_INFO.aboutUs}
          </p>
          <div style="margin-top:20px; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            ${COMPANY_INFO.highlights
              .map(
                (h) => `
              <div style="font-size:12px; font-weight:bold; color:#1F2937; display:flex; align-items:center; gap:8px;">
                <span style="color:#D97706; font-size:16px;">✓</span> ${h}
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div style="background:#7F1D1D; color:#FFFFFF; border-radius:16px; padding:25px; display:flex; justify-content:space-between; text-align:left;">
          <div>
            <div style="font-weight:bold; font-size:15px; color:#FCD34D;">HARIOM CATERERS</div>
            <div style="font-size:12px; opacity:0.9; margin-top:4px;">Proprietor: ${COMPANY_INFO.owner}</div>
            <div style="font-size:12px; opacity:0.9; margin-top:2px;">City: ${COMPANY_INFO.city}, Gujarat</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:bold; font-size:13px; color:#FCD34D;">CONTACT FOR BOOKINGS</div>
            <div style="font-size:13px; font-weight:bold; margin-top:4px;">+91 ${COMPANY_INFO.phone}</div>
            <div style="font-size:12px; opacity:0.9;">+91 ${CONTACT.altPhone}</div>
            <div style="font-size:11px; opacity:0.8; margin-top:2px;">${COMPANY_INFO.email}</div>
          </div>
        </div>

        <div style="font-size:11px; font-weight:bold; color:#9CA3AF; letter-spacing:2px; margin-top:20px;">
          PAGE 1 — HARIOM CATERERS MASTER CATALOG
        </div>
      </div>
    `;

    // Catalog Menu Pages
    for (let p = 0; p < totalCatalogPages; p++) {
      const pageCats = categories.slice(p * categoriesPerPage, (p + 1) * categoriesPerPage);

      html += `
        <div id="master-pdf-page-cat-${p}" style="width:794px; height:1123px; padding:35px; box-sizing:border-box; background:#FFFFFF; display:flex; flex-direction:column; justify-between; font-family:sans-serif;">
          <div>
            <!-- Header Bar -->
            <div style="background:#7F1D1D; color:#FFFFFF; padding:12px 20px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
              <div style="display:flex; align-items:center; gap:12px;">
                <img src="${HARIOM_LOGO_SVG_DATA_URI}" style="height:36px; background:#FFFFFF; padding:2px; border-radius:6px;" />
                <span style="font-weight:bold; font-size:16px; letter-spacing:1px; text-transform:uppercase;">Master Menu Options</span>
              </div>
              <span style="background:#15803D; color:#FFFFFF; font-size:11px; font-weight:bold; padding:4px 12px; border-radius:20px;">
                100% PURE VEG
              </span>
            </div>

            <!-- Categories -->
            <div style="display:flex; flex-direction:column; gap:16px;">
              ${pageCats
                .map((cat) => {
                  const items = activeCatalog[cat] || [];
                  return `
                  <div style="background:#FFFDF7; border:1px solid #F3F4F6; border-left:4px solid #D97706; border-radius:8px; padding:12px 16px;">
                    <div style="font-size:14px; font-weight:800; color:#7F1D1D; text-transform:uppercase; margin-bottom:6px; display:flex; align-items:center; justify-content:space-between;">
                      <span>${cat}</span>
                      <span style="font-size:11px; font-weight:normal; color:#B45309;">(${items.length} Varieties)</span>
                    </div>
                    <div style="font-size:11px; color:#374151; line-height:1.6; font-weight:500;">
                      ${items.join("  •  ")}
                    </div>
                  </div>
                `;
                })
                .join("")}
            </div>
          </div>

          <div style="border-top:1px solid #E5E7EB; pt:10px; display:flex; justify-content:space-between; font-size:10px; font-weight:bold; color:#6B7280; text-transform:uppercase;">
            <span>Hariom Caterers — Master Menu Catalog</span>
            <span>Page ${p + 2} of ${totalCatalogPages + 2}</span>
          </div>
        </div>
      `;
    }

    // Final Page: Terms & Conditions & Exclusion Rates
    html += `
      <div id="master-pdf-page-terms" style="width:794px; height:1123px; padding:35px; box-sizing:border-box; background:#FFFFFF; display:flex; flex-direction:column; justify-between; font-family:sans-serif;">
        <div>
          <div style="background:#7F1D1D; color:#FFFFFF; padding:12px 20px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${HARIOM_LOGO_SVG_DATA_URI}" style="height:36px; background:#FFFFFF; padding:2px; border-radius:6px;" />
              <span style="font-weight:bold; font-size:16px; letter-spacing:1px; text-transform:uppercase;">Terms & Conditions</span>
            </div>
            <span style="background:#D97706; color:#FFFFFF; font-size:11px; font-weight:bold; padding:4px 12px; border-radius:20px;">
              Catering Policy
            </span>
          </div>

          <div style="background:#FFFDF7; border:1px solid #E5E7EB; border-radius:12px; padding:20px; margin-bottom:20px;">
            <h3 style="color:#7F1D1D; font-size:14px; font-weight:bold; margin-bottom:10px; text-transform:uppercase;">
              Standard Catering Terms
            </h3>
            <div style="font-size:11px; color:#374151; line-height:1.6; display:flex; flex-direction:column; gap:6px;">
              ${TERMS_AND_CONDITIONS.map((t) => `<div>• ${t}</div>`).join("")}
            </div>
          </div>

          <div style="background:#FFF8ED; border:1px solid #F59E0B; border-radius:12px; padding:20px;">
            <h3 style="color:#7F1D1D; font-size:13px; font-weight:bold; margin-bottom:10px; text-transform:uppercase;">
              Items Not Included in Regular Packages (Charged Extra Per Person):
            </h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:11px; font-weight:600; color:#1F2937;">
              ${EXCLUSION_RATES.map(
                (ex) => `
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid #FED7AA; padding-bottom:4px;">
                  <span>${ex.item}</span>
                  <span style="color:#D97706; font-weight:bold;">${ex.rate}</span>
                </div>
              `,
              ).join("")}
            </div>
          </div>
        </div>

        <div style="background:#F3F4F6; border-radius:12px; padding:20px; text-align:center;">
          <div style="font-weight:bold; font-size:14px; color:#7F1D1D; text-transform:uppercase;">
            Book Your Pure Vegetarian Feast Today!
          </div>
          <div style="font-size:12px; color:#4B5563; margin-top:4px;">
            Call / WhatsApp Khimjibhai Purohit: <strong>+91 ${COMPANY_INFO.phone}</strong> | <strong>+91 ${CONTACT.altPhone}</strong>
          </div>
          <div style="font-size:10px; color:#9CA3AF; margin-top:15px; letter-spacing:1px; uppercase;">
            Page ${totalCatalogPages + 2} of ${totalCatalogPages + 2} — Hariom Caterers Official Policy
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Convert pages to PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
      compress: true,
    });

    const pageElements = container.children;
    for (let i = 0; i < pageElements.length; i++) {
      const el = pageElements[i] as HTMLElement;
      const canvas = await html2canvas(el, {
        scale: 1.8,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#FFFFFF",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    document.body.removeChild(container);

    const filename = "Hariom-Caterers-Master-Menu-Catalog.pdf";
    try {
      const pdfBlob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch {
      pdf.save(filename);
    }

    toast.success("Hariom Master Menu Catalog downloaded successfully!", { id: toastId });
  } catch (err) {
    console.error("Master PDF generation failed:", err);
    toast.error("Failed to generate PDF. Please try again.", { id: toastId });
  }
}

export async function downloadPackagesPdf() {
  const customPkgs = getCustomPackages();
  if (customPkgs && customPkgs.length > 0) {
    return downloadCustomPackagesPdf(customPkgs);
  }
  const toastId = toast.loading("Generating Hariom Caterers Packages PDF...");

  try {
    const { jsPDF } = await import("jspdf");
    const html2canvas = (await import("html2canvas")).default;

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.width = "794px";
    container.style.backgroundColor = "#FFFFFF";
    container.style.zIndex = "-100";
    document.body.appendChild(container);

    let html = "";

    // Generate page for each Package
    PACKAGES.forEach((pkg, index) => {
      const opt1 = pkg.options[0];
      const opt2 = pkg.options[1];

      html += `
        <div id="pkg-pdf-page-${pkg.id}" style="width:794px; height:1123px; padding:35px; box-sizing:border-box; background:#FFFFFF; display:flex; flex-direction:column; justify-between; font-family:sans-serif; border:8px solid ${pkg.color};">
          <div>
            <!-- Header Bar -->
            <div style="background:#7F1D1D; color:#FFFFFF; padding:12px 20px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:15px;">
              <div style="display:flex; align-items:center; gap:12px;">
                <img src="${HARIOM_LOGO_SVG_DATA_URI}" style="height:36px; background:#FFFFFF; padding:2px; border-radius:6px;" />
                <div>
                  <span style="font-weight:bold; font-size:16px; letter-spacing:1px; text-transform:uppercase; display:block;">HARIOM CATERERS</span>
                  <span style="font-size:11px; opacity:0.8;">Prop. Khimjibhai Purohit • +91 ${COMPANY_INFO.phone}</span>
                </div>
              </div>
              <div style="text-align:right;">
                <span style="background:${pkg.color}; color:#FFFFFF; font-size:16px; font-weight:900; padding:4px 16px; border-radius:20px; display:inline-block;">
                  ${pkg.name.toUpperCase()} PACKAGE — ₹${pkg.price}/-
                </span>
              </div>
            </div>

            <p style="font-size:12px; color:#4B5563; font-style:italic; margin-bottom:15px; text-align:center; font-weight:600;">
              "${pkg.tagline}"
            </p>

            <!-- Options Grid -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
              <!-- Option 1 -->
              <div style="background:#FFFDF7; border:1px solid #F3F4F6; border-top:4px solid #D97706; border-radius:10px; padding:12px 14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #E5E7EB; padding-bottom:6px; margin-bottom:8px;">
                  <span style="font-size:14px; font-weight:800; color:#7F1D1D;">OPTION - 1</span>
                  <span style="font-size:10px; font-weight:bold; background:#15803D; color:#FFF; padding:2px 8px; border-radius:10px;">Min ${opt1.minPax} pax</span>
                </div>
                <div style="font-size:11px; color:#1F2937; line-height:1.5;">
                  ${opt1.categories
                    .map(
                      (c) => `
                    <div style="display:flex; justify-content:space-between; border-bottom:1px dashed #F3F4F6; padding:3px 0;">
                      <span>${c.name}${c.note ? ` <small style="color:#B45309;">(${c.note})</small>` : ""}</span>
                      <strong style="color:#7F1D1D;">${c.count}</strong>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
                <div style="margin-top:8px; font-size:10px; font-weight:bold; color:#166534; text-align:center; background:#DCFCE7; padding:4px; border-radius:6px;">
                  ✓ 200 ml Water Bottle Included
                </div>
              </div>

              <!-- Option 2 -->
              <div style="background:#FFFDF7; border:1px solid #F3F4F6; border-top:4px solid ${pkg.color}; border-radius:10px; padding:12px 14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #E5E7EB; padding-bottom:6px; margin-bottom:8px;">
                  <span style="font-size:14px; font-weight:800; color:#7F1D1D;">OPTION - 2</span>
                  <span style="font-size:10px; font-weight:bold; background:#7F1D1D; color:#FFF; padding:2px 8px; border-radius:10px;">Min ${opt2.minPax} pax</span>
                </div>
                <div style="font-size:11px; color:#1F2937; line-height:1.5;">
                  ${opt2.categories
                    .map(
                      (c) => `
                    <div style="display:flex; justify-content:space-between; border-bottom:1px dashed #F3F4F6; padding:3px 0;">
                      <span>${c.name}${c.note ? ` <small style="color:#B45309;">(${c.note})</small>` : ""}</span>
                      <strong style="color:#7F1D1D;">${c.count}</strong>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
                <div style="margin-top:8px; font-size:10px; font-weight:bold; color:#166534; text-align:center; background:#DCFCE7; padding:4px; border-radius:6px;">
                  ✓ 200 ml Water Bottle Included
                </div>
              </div>
            </div>
          </div>

          <div style="border-top:1px solid #E5E7EB; pt:10px; display:flex; justify-content:space-between; font-size:10px; font-weight:bold; color:#6B7280; text-transform:uppercase;">
            <span>Hariom Caterers — Fixed Package List</span>
            <span>Page ${index + 1} of ${PACKAGES.length + 1}</span>
          </div>
        </div>
      `;
    });

    // Terms & Conditions Page
    html += `
      <div id="pkg-pdf-page-terms" style="width:794px; height:1123px; padding:35px; box-sizing:border-box; background:#FFFFFF; display:flex; flex-direction:column; justify-between; font-family:sans-serif;">
        <div>
          <div style="background:#7F1D1D; color:#FFFFFF; padding:12px 20px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${HARIOM_LOGO_SVG_DATA_URI}" style="height:36px; background:#FFFFFF; padding:2px; border-radius:6px;" />
              <span style="font-weight:bold; font-size:16px; letter-spacing:1px; text-transform:uppercase;">Terms & Conditions</span>
            </div>
            <span style="background:#D97706; color:#FFFFFF; font-size:11px; font-weight:bold; padding:4px 12px; border-radius:20px;">
              Catering Policy
            </span>
          </div>

          <div style="background:#FFFDF7; border:1px solid #E5E7EB; border-radius:12px; padding:20px; margin-bottom:20px;">
            <h3 style="color:#7F1D1D; font-size:14px; font-weight:bold; margin-bottom:10px; text-transform:uppercase;">
              Standard Catering Terms
            </h3>
            <div style="font-size:11px; color:#374151; line-height:1.6; display:flex; flex-direction:column; gap:6px;">
              ${TERMS_AND_CONDITIONS.map((t) => `<div>• ${t}</div>`).join("")}
            </div>
          </div>

          <div style="background:#FFF8ED; border:1px solid #F59E0B; border-radius:12px; padding:20px;">
            <h3 style="color:#7F1D1D; font-size:13px; font-weight:bold; margin-bottom:10px; text-transform:uppercase;">
              Items Not Included in Regular Packages (Charged Extra Per Person):
            </h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:11px; font-weight:600; color:#1F2937;">
              ${EXCLUSION_RATES.map(
                (ex) => `
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid #FED7AA; padding-bottom:4px;">
                  <span>${ex.item}</span>
                  <span style="color:#D97706; font-weight:bold;">${ex.rate}</span>
                </div>
              `,
              ).join("")}
            </div>
          </div>
        </div>

        <div style="background:#F3F4F6; border-radius:12px; padding:20px; text-align:center;">
          <div style="font-weight:bold; font-size:14px; color:#7F1D1D; text-transform:uppercase;">
            Book Your Pure Vegetarian Feast Today!
          </div>
          <div style="font-size:12px; color:#4B5563; margin-top:4px;">
            Call / WhatsApp Khimjibhai Purohit: <strong>+91 ${COMPANY_INFO.phone}</strong> | <strong>+91 ${CONTACT.altPhone}</strong>
          </div>
          <div style="font-size:10px; color:#9CA3AF; margin-top:15px; letter-spacing:1px; uppercase;">
            Page ${PACKAGES.length + 1} of ${PACKAGES.length + 1} — Hariom Caterers Official Packages Policy
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
      compress: true,
    });

    const pageElements = container.children;
    for (let i = 0; i < pageElements.length; i++) {
      const el = pageElements[i] as HTMLElement;
      const canvas = await html2canvas(el, {
        scale: 1.8,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#FFFFFF",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    document.body.removeChild(container);

    const filename = "Hariom-Caterers-Packages-List.pdf";
    try {
      const pdfBlob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch {
      pdf.save(filename);
    }

    toast.success("Hariom Packages PDF downloaded successfully!", { id: toastId });
  } catch (err) {
    console.error("Packages PDF generation failed:", err);
    toast.error("Failed to generate Packages PDF. Please try again.", { id: toastId });
  }
}

/** Export Custom / All Admin Dishes into a clean printable PDF report */
export async function downloadAdminDishesPdf(
  customDishesInput?: Array<{ id: string; name: string; category: string; image?: string }>,
) {
  const customDishes =
    customDishesInput && customDishesInput.length > 0 ? customDishesInput : getCustomDishes();
  const toastId = toast.loading("Generating Menu Planner Dishes PDF...");

  try {
    const { jsPDF } = await import("jspdf");
    const html2canvas = (await import("html2canvas")).default;

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.width = "794px";
    container.style.backgroundColor = "#FFFFFF";
    container.style.zIndex = "-100";
    document.body.appendChild(container);

    // Group custom dishes by category
    const grouped: Record<string, string[]> = {};
    customDishes.forEach((d) => {
      const cat = d.category || "General / Uncategorized";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(d.name);
    });

    const categories = Object.keys(grouped);
    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const html = `
      <div style="width:794px; min-height:1123px; padding:35px; box-sizing:border-box; background:#FFFFFF; display:flex; flex-direction:column; justify-between; font-family:sans-serif; border:8px solid #E52320;">
        <div>
          <!-- Header Bar -->
          <div style="background:#7F1D1D; color:#FFFFFF; padding:16px 20px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${HARIOM_LOGO_SVG_DATA_URI}" style="height:40px; background:#FFFFFF; padding:3px; border-radius:6px;" />
              <div>
                <span style="font-weight:bold; font-size:18px; letter-spacing:1px; text-transform:uppercase; display:block;">HARIOM CATERERS</span>
                <span style="font-size:11px; opacity:0.85;">Menu Planner Master Dishes List • Exported on ${dateStr}</span>
              </div>
            </div>
            <div style="text-align:right;">
              <span style="background:#D97706; color:#FFFFFF; font-size:12px; font-weight:bold; padding:6px 14px; border-radius:20px; display:inline-block;">
                Total ${customDishes.length} Items
              </span>
            </div>
          </div>

          <p style="font-size:12px; color:#4B5563; font-style:italic; margin-bottom:20px; text-align:center; font-weight:600;">
            "Official Menu Catalog & Custom Dishes Database for Hariom Caterers"
          </p>

          ${
            categories.length === 0
              ? `<div style="text-align:center; padding:40px; background:#FFF8ED; border:2px dashed #F59E0B; border-radius:12px; color:#B45309; font-weight:bold;">No custom dishes found in database.</div>`
              : `<div style="display:flex; flex-direction:column; gap:16px;">
                  ${categories
                    .map(
                      (cat) => `
                    <div style="background:#FFFDF7; border:1px solid #E5E7EB; border-left:5px solid #E52320; border-radius:10px; padding:14px 18px;">
                      <div style="font-size:15px; font-weight:800; color:#7F1D1D; text-transform:uppercase; margin-bottom:8px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #F3F4F6; padding-bottom:4px;">
                        <span>${cat}</span>
                        <span style="font-size:11px; font-weight:bold; color:#B45309; background:#FEF3C7; px:8px; py:2px; border-radius:10px;">${grouped[cat].length} Dishes</span>
                      </div>
                      <div style="font-size:12px; color:#1F2937; line-height:1.7; font-weight:600;">
                        ${grouped[cat].join("  •  ")}
                      </div>
                    </div>
                  `,
                    )
                    .join("")}
                </div>`
          }
        </div>

        <div style="border-top:1px solid #E5E7EB; padding-top:15px; margin-top:30px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#6B7280;">
          <div><strong>HARIOM CATERERS</strong> • Prop. Khimjibhai Purohit: +91 ${COMPANY_INFO.phone}</div>
          <div>100% Pure Veg Catering • Export Page 1</div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    const canvas = await html2canvas(container.firstElementChild as HTMLElement, {
      scale: 1.8,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#FFFFFF",
      logging: false,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
      compress: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

    document.body.removeChild(container);

    const filename = `Hariom-Caterers-Menu-Dishes-${dateStr.replace(/ /g, "-")}.pdf`;
    try {
      const pdfBlob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch {
      pdf.save(filename);
    }

    toast.success("Menu Planner Dishes PDF exported successfully!", { id: toastId });
  } catch (err) {
    console.error("Admin Dishes PDF generation failed:", err);
    toast.error("Failed to export Dishes PDF.", { id: toastId });
  }
}

/** Export Custom / Admin Packages into a clean PDF report */
export async function downloadCustomPackagesPdf(
  customPackagesInput?: Array<{
    id: string;
    name: string;
    price: number;
    tagline: string;
    color: string;
    minPax?: number;
    categories: Array<{ name: string; count: number; note?: string; menuItems?: string[] }>;
  }>,
) {
  const customPackages =
    customPackagesInput && customPackagesInput.length > 0
      ? customPackagesInput
      : getCustomPackages();
  const toastId = toast.loading("Generating Package Planner PDF Report...");

  try {
    const { jsPDF } = await import("jspdf");
    const html2canvas = (await import("html2canvas")).default;

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.width = "794px";
    container.style.backgroundColor = "#FFFFFF";
    container.style.zIndex = "-100";
    document.body.appendChild(container);

    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const html = `
      <div style="width:794px; min-height:1123px; padding:35px; box-sizing:border-box; background:#FFFFFF; display:flex; flex-direction:column; justify-between; font-family:sans-serif; border:8px solid #7F1D1D;">
        <div>
          <!-- Header Bar -->
          <div style="background:#7F1D1D; color:#FFFFFF; padding:16px 20px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${HARIOM_LOGO_SVG_DATA_URI}" style="height:40px; background:#FFFFFF; padding:3px; border-radius:6px;" />
              <div>
                <span style="font-weight:bold; font-size:18px; letter-spacing:1px; text-transform:uppercase; display:block;">HARIOM CATERERS</span>
                <span style="font-size:11px; opacity:0.85;">Package Planner Export Report • Date: ${dateStr}</span>
              </div>
            </div>
            <div style="text-align:right;">
              <span style="background:#D97706; color:#FFFFFF; font-size:12px; font-weight:bold; padding:6px 14px; border-radius:20px; display:inline-block;">
                ${customPackages.length} Packages
              </span>
            </div>
          </div>

          ${
            customPackages.length === 0
              ? `<div style="text-align:center; padding:40px; background:#FFF8ED; border:2px dashed #F59E0B; border-radius:12px; color:#B45309; font-weight:bold;">No packages found in package manager.</div>`
              : `<div style="display:flex; flex-direction:column; gap:20px;">
                  ${customPackages
                    .map(
                      (pkg) => `
                    <div style="background:#FFFDF7; border:2px solid ${pkg.color || "#D97706"}; border-radius:12px; padding:16px; position:relative;">
                      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #E5E7EB; padding-bottom:8px; margin-bottom:10px;">
                        <div>
                          <span style="font-size:18px; font-weight:900; color:#7F1D1D; text-transform:uppercase;">${pkg.name}</span>
                          <span style="font-size:12px; font-weight:bold; color:#B45309; margin-left:10px;">Min ${pkg.minPax || 100} Pax</span>
                        </div>
                        <span style="background:${pkg.color || "#7F1D1D"}; color:#FFFFFF; font-size:16px; font-weight:900; padding:4px 14px; border-radius:20px;">
                          ₹${pkg.price}/- per person
                        </span>
                      </div>
                      <p style="font-size:12px; color:#4B5563; font-style:italic; margin-bottom:10px;">"${pkg.tagline || "Custom Royal Package"}"</p>

                      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:11px;">
                        ${pkg.categories
                          .map(
                            (c) => `
                          <div style="background:#FFFFFF; border:1px solid #F3F4F6; padding:8px 10px; border-radius:6px;">
                            <div style="display:flex; justify-content:space-between; font-weight:bold; color:#1F2937;">
                              <span>${c.name} ${c.note ? `<small style="color:#B45309;">(${c.note})</small>` : ""}</span>
                              <span style="color:#7F1D1D; font-weight:900;">${c.count} items</span>
                            </div>
                            ${
                              c.menuItems && c.menuItems.length > 0
                                ? `<div style="font-size:10px; color:#6B7280; margin-top:4px;">${c.menuItems.map((m) => m.replace(/\[img\].*?\[img\]/, "")).join(", ")}</div>`
                                : ""
                            }
                          </div>
                        `,
                          )
                          .join("")}
                      </div>
                    </div>
                  `,
                    )
                    .join("")}
                </div>`
          }
        </div>

        <div style="border-top:1px solid #E5E7EB; padding-top:15px; margin-top:30px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#6B7280;">
          <div><strong>HARIOM CATERERS</strong> • Prop. Khimjibhai Purohit: +91 ${COMPANY_INFO.phone}</div>
          <div>100% Pure Veg Catering Package Report</div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    const canvas = await html2canvas(container.firstElementChild as HTMLElement, {
      scale: 1.8,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#FFFFFF",
      logging: false,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
      compress: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

    document.body.removeChild(container);

    const filename = `Hariom-Caterers-Package-Report-${dateStr.replace(/ /g, "-")}.pdf`;
    try {
      const pdfBlob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch {
      pdf.save(filename);
    }

    toast.success("Package Planner PDF report exported successfully!", { id: toastId });
  } catch (err) {
    console.error("Custom Packages PDF generation failed:", err);
    toast.error("Failed to export Package Report PDF.", { id: toastId });
  }
}
