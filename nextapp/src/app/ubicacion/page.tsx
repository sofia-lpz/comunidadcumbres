export default function UbicacionPage() {
  return (
    <main className="px-6 py-12 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Nuestra ubicación</h1>
      <div className="w-full h-[0] pb-[75%] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.4621835462235!2d-99.2613858!3d19.3491303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d200be8ac758a7%3A0x235b548988d59bc4!2sCUMBRES%20DE%20SANTA%20FE!5e0!3m2!1ses-419!2smx!4v1753208390413!5m2!1ses-419!2smx"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-lg"
        />
      </div>
    </main>
  );
}
