"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  ChevronRight,
  Check,
  Camera,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "price_drops",
      label: "Reduceri de preț",
      description: "Notificări când produsele din wishlist scad în preț",
      enabled: true,
    },
    {
      id: "back_in_stock",
      label: "Înapoi în stoc",
      description: "Notificări când produsele revin în stoc",
      enabled: true,
    },
    {
      id: "artist_releases",
      label: "Lansări artiști",
      description: "Noutăți de la artiștii urmăriți",
      enabled: true,
    },
    {
      id: "order_updates",
      label: "Actualizări comenzi",
      description: "Status livrare și confirmări",
      enabled: true,
    },
    {
      id: "newsletter",
      label: "Newsletter",
      description: "Oferte exclusive și noutăți săptămânale",
      enabled: false,
    },
  ]);

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "addresses", label: "Adrese", icon: MapPin },
    { id: "notifications", label: "Notificări", icon: Bell },
    { id: "security", label: "Securitate", icon: Shield },
    { id: "payment", label: "Plată", icon: CreditCard },
  ];

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, enabled: !n.enabled } : n
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-white">
          Setări Cont
        </h1>
        <p className="text-gray-400 mt-1">
          Gestionează profilul și preferințele tale
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
                  activeTab === tab.id
                    ? "bg-gold/10 text-gold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{tab.label}</span>
                <ChevronRight className={cn(
                  "w-4 h-4 ml-auto transition-transform",
                  activeTab === tab.id && "rotate-90"
                )} />
              </button>
            ))}

            <hr className="border-white/10 my-4" />

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-left">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Deconectare</span>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            {activeTab === "profile" && (
              <ProfileSettings />
            )}

            {activeTab === "addresses" && (
              <AddressSettings />
            )}

            {activeTab === "notifications" && (
              <NotificationSettings
                notifications={notifications}
                onToggle={toggleNotification}
              />
            )}

            {activeTab === "security" && (
              <SecuritySettings />
            )}

            {activeTab === "payment" && (
              <PaymentSettings />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-heading font-semibold text-white">
        Informații Profil
      </h2>

      {/* Avatar */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
            <User className="w-10 h-10 text-gold" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gold text-bleu-dark flex items-center justify-center hover:bg-gold-light transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <p className="text-white font-medium">Alexandru Ionescu</p>
          <p className="text-sm text-gray-500">alexandru@email.com</p>
          <p className="text-xs text-gray-600 mt-1">Membru din Ianuarie 2024</p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Prenume</label>
          <input
            type="text"
            defaultValue="Alexandru"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Nume</label>
          <input
            type="text"
            defaultValue="Ionescu"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Email</label>
          <input
            type="email"
            defaultValue="alexandru@email.com"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Telefon</label>
          <input
            type="tel"
            defaultValue="+40 721 234 567"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50"
          />
        </div>
      </div>

      <button className="px-6 py-3 bg-gold text-bleu-dark font-semibold rounded-lg hover:bg-gold-light transition-colors">
        Salvează modificările
      </button>
    </div>
  );
}

function AddressSettings() {
  const addresses = [
    {
      id: "1",
      name: "Alexandru Ionescu",
      street: "Str. Muzicii nr. 42",
      city: "Timișoara",
      postalCode: "300001",
      country: "România",
      isDefault: true,
    },
    {
      id: "2",
      name: "Alexandru Ionescu",
      street: "Bd. Unirii nr. 15, Ap. 8",
      city: "București",
      postalCode: "030167",
      country: "România",
      isDefault: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-white">
          Adrese de Livrare
        </h2>
        <button className="text-sm text-gold hover:text-gold-light">
          + Adaugă adresă
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={cn(
              "p-4 rounded-lg border",
              address.isDefault
                ? "bg-gold/10 border-gold/30"
                : "bg-white/5 border-white/10"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-white">{address.name}</p>
                <p className="text-sm text-gray-400 mt-1">{address.street}</p>
                <p className="text-sm text-gray-400">
                  {address.city}, {address.postalCode}
                </p>
                <p className="text-sm text-gray-400">{address.country}</p>
              </div>
              <div className="flex items-center gap-2">
                {address.isDefault && (
                  <span className="px-2 py-1 text-xs bg-gold/20 text-gold rounded-full">
                    Implicită
                  </span>
                )}
                <button className="text-sm text-gray-400 hover:text-white">
                  Editează
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationSettings({
  notifications,
  onToggle,
}: {
  notifications: NotificationSetting[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-heading font-semibold text-white">
        Preferințe Notificări
      </h2>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white/5"
          >
            <div>
              <p className="font-medium text-white">{notification.label}</p>
              <p className="text-sm text-gray-500">{notification.description}</p>
            </div>
            <button
              onClick={() => onToggle(notification.id)}
              className={cn(
                "relative w-12 h-6 rounded-full transition-colors",
                notification.enabled ? "bg-gold" : "bg-white/10"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                  notification.enabled ? "left-7" : "left-1"
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-heading font-semibold text-white">
        Securitate
      </h2>

      {/* Change password */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <h3 className="font-medium text-white mb-4">Schimbă parola</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Parola actuală
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Parola nouă
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Confirmă parola nouă
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50"
            />
          </div>
          <button className="px-6 py-3 bg-gold text-bleu-dark font-semibold rounded-lg hover:bg-gold-light transition-colors">
            Actualizează parola
          </button>
        </div>
      </div>

      {/* Two-factor */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">Autentificare în doi pași</h3>
            <p className="text-sm text-gray-500 mt-1">
              Adaugă un nivel suplimentar de securitate
            </p>
          </div>
          <button className="px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
            Activează
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentSettings() {
  const cards = [
    {
      id: "1",
      type: "Visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-white">
          Metode de Plată
        </h2>
        <button className="text-sm text-gold hover:text-gold-light">
          + Adaugă card
        </button>
      </div>

      <div className="space-y-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg border",
              card.isDefault
                ? "bg-gold/10 border-gold/30"
                : "bg-white/5 border-white/10"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded bg-white/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="font-medium text-white">
                  {card.type} •••• {card.last4}
                </p>
                <p className="text-sm text-gray-500">Expiră {card.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {card.isDefault && (
                <span className="px-2 py-1 text-xs bg-gold/20 text-gold rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Implicit
                </span>
              )}
              <button className="text-sm text-gray-400 hover:text-white">
                Editează
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
