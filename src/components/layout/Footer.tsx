import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { companyInfo, contactDetails, socialLinks, footerLinks } from "@/config/contact";
import forteraIcon from "@/assets/fortera-icon.png";

const Footer = () => {
  const socialIcons = [
    { icon: Twitter, href: socialLinks.twitter, label: "Twitter" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
    { icon: Facebook, href: socialLinks.facebook, label: "Facebook" },
    { icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={forteraIcon} alt="Fortera" className="h-10 w-10" />
              <span className="text-xl font-semibold">{companyInfo.name}</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm mb-6">
              {companyInfo.description}
            </p>
            <div className="flex gap-4">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subsidiaries Links */}
          <div>
            <h4 className="font-semibold mb-4">Subsidiaries</h4>
            <ul className="space-y-3">
              {footerLinks.subsidiaries.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <a href={`mailto:${contactDetails.email}`} className="hover:text-background transition-colors">
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contactDetails.phone}`} className="hover:text-background transition-colors">
                  {contactDetails.phone}
                </a>
              </li>
              <li>
                {contactDetails.address.city}, {contactDetails.address.country}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
