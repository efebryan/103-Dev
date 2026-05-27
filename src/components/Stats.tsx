export default function Stats() {
  return (
    <section className="py-12 bg-surface-container-lowest/50 border-y border-white/5">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="space-y-1">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">10,000+</h2>
          <p className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Happy Customers</p>
        </div>
        <div className="space-y-1">
          <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">3,500+</h2>
          <p className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Premium Products</p>
        </div>
        <div className="space-y-1">
          <h2 className="text-4xl md:text-5xl font-extrabold text-tertiary tracking-tight">1M+</h2>
          <p className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Assets Downloaded</p>
        </div>
      </div>
    </section>
  );
}
