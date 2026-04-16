import { Truck, CreditCard, BookOpen, BadgeCheck } from "lucide-react";
import { Questrial } from "next/font/google";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

const badges = [
  {
    icon: Truck,
    label: "Transport Gratuit",
    description: "PENTRU COMENZI PESTE 300 RON",
  },
  {
    icon: CreditCard,
    label: "Plătește în Rate",
    description: "SISTEM DE FINANȚARE 0% DOBÂNDĂ",
  },
  {
    icon: BookOpen,
    label: "20+ Titluri",
    description: "COLECȚII EDITORIALE EXCLUSIVE",
  },
  {
    icon: BadgeCheck,
    label: "Clienți Mulțumiți",
    description: "EXCELENȚĂ CONFIRMATĂ ZILNIC",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-bleu-dark">
      <div className="w-full">
        {/* Full-width 3D container */}
        <div
          className="bg-bleu-deepest px-8 py-8 md:px-16 md:py-10"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.3)",
            borderTop: "1px solid rgba(179, 153, 105, 0.2)",
            borderBottom: "1px solid rgba(179, 153, 105, 0.2)",
          }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {badges.map((badge) => (
              <div key={badge.label} className="flex items-start gap-4">
                {/* Icon container */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-bleu-dark flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-gold" />
                </div>
                {/* Text with 3D effect */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`${questrial.className} text-white text-base mb-1 uppercase tracking-wide`}
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                  >
                    {badge.label}
                  </p>
                  <p
                    className={`${questrial.className} text-gray-500 text-xs uppercase tracking-wider leading-relaxed`}
                    style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.3)" }}
                  >
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
