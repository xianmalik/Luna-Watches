import Link from 'next/link';

import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#171717] text-[#F5F5F5] pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Explore Section */}
                    <div>
                        <h3 className="text-lg font-semibold tracking-wide mb-4">EXPLORE</h3>
                        <ul className="text-sm space-y-1">
                            <li><Link href="/watches">All Watches</Link></li>
                            <li><Link href="/journal">Collector&apos;s Journal</Link></li>
                            <li><Link href="/collections">Collections</Link></li>
                            <li><Link href="/guides">Buying Guides</Link></li>
                            <li><Link href="/reviews">Watch Reviews</Link></li>
                        </ul>
                    </div>

                    {/* Service Section */}
                    <div>
                        <h3 className="text-lg font-semibold tracking-wide mb-4">SERVICE</h3>
                        <ul className="text-sm space-y-1">
                            <li><Link href="/sell">Sell Your Watch</Link></li>
                            <li><Link href="/trade">Trade Your Watch</Link></li>
                            <li><Link href="/care">Extend Care</Link></li>
                            <li><Link href="/repairs">Warranties and Repairs</Link></li>
                            <li><Link href="/faq">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="text-lg font-semibold tracking-wide mb-4">COMPANY</h3>
                        <ul className="text-sm space-y-1">
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/team">Our Team</Link></li>
                            <li><Link href="/locations">Our Locations</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                            <li><Link href="/testimonials">Testimonials</Link></li>
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div>
                        <h3 className="text-lg font-semibold tracking-wide mb-4">CONNECT</h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="https://facebook.com">
                                <span className="sr-only">Facebook</span>
                                <Facebook />
                            </a>
                            <a href="https://instagram.com">
                                <span className="sr-only">Instagram</span>
                                <Instagram />
                            </a>
                            <a href="https://twitter.com">
                                <span className="sr-only">Twitter</span>
                                <Twitter />
                            </a>
                        </div>
                        
                        {/* <h3 className="text-xl font-semibold mb-4">PAYMENT METHODS</h3>
                        <div className="flex space-x-4">
                            <Image src="/visa.png" alt="Visa" width={32} height={32} />
                            <Image src="/mastercard.png" alt="Mastercard" width={32} height={32} />
                            <Image src="/paypal.png" alt="PayPal" width={32} height={32} />
                        </div> */}
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-300 text-center text-sm">
                    <p>Copyright {new Date().getFullYear()} Luna Watches | All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
}