import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { SocialLinks } from '@/components/SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-accent pt-20 pb-10 text-white/70 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <img src="/logo.webp" alt="CS Franddos" className="h-10 w-auto block mb-6" />
            <p className="text-sm leading-relaxed mb-8 max-w-xs">
              A premium travel, visa, and international recruitment agency dedicated to unlocking borders and building global careers.
            </p>
            <div className="flex gap-4">
              <SocialLinks itemClassName="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="/destinations" className="hover:text-secondary transition-colors">Destinations</a></li>
              <li><a href="/#recruitment" className="hover:text-secondary transition-colors">Careers Abroad</a></li>
              <li><a href="/contact" className="hover:text-secondary transition-colors">Contact Support</a></li>
              <li><a href="/contact" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6"><a href="/services" className="hover:text-secondary transition-colors">Services</a></h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/services" className="hover:text-secondary transition-colors">Visa Application</a></li>
              <li><a href="/services" className="hover:text-secondary transition-colors">Travel & Tour</a></li>
              <li><a href="/services" className="hover:text-secondary transition-colors">Ticketing & Hotel</a></li>
              <li><a href="/services" className="hover:text-secondary transition-colors">Passport Assistance</a></li>
              <li><a href="/services" className="hover:text-secondary transition-colors">Birth Certificates</a></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-serif font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                <span>Ashiaman, Near Tigo Office<br />Greater Accra, Ghana</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-secondary shrink-0 mt-0.5" />
                <div>
                  <span>024 778 9031</span><br />
                  <span>024 203 5562</span><br />
                  <span>059 873 7651</span><br />
                  <span>059 825 6003</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <span>csfranddosltd@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} CS Franddos Limited. All rights reserved.</p>
          <p>Designed for Global Excellence by <a href="https://ogenci.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors underline underline-offset-2">OGENCI</a></p>
        </div>
      </div>
    </footer>
  );
}
