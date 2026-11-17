import { NextResponse } from "next/server";
import { stokGudang } from "@/lib/warehouse";

export const dynamic = "force-dynamic";

export async function GET() {
  const stock = stokGudang();
  return NextResponse.json({
    ok: true,
    sample_data: true,
    summary: {
      shipment_count: stock.pengiriman.length,
      produce_kg: stock.totalKg,
      container_count: stock.totalUnit,
    },
    produce: stock.pengiriman.map((r) => ({
      batch_id: r.batch.id,
      komoditas: r.batch.komoditas,
      lokasi: r.lokasiSaatIni,
      berat_kg: r.beratSaatIniKg,
      status: r.status,
      units: r.batch.units,
    })),
    supplies: stock.perlengkapan,
  });
}
