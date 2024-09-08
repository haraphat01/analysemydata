import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="container mx-auto py-4 flex justify-between items-center">
        <Image src="/logo.png" alt="DataSmart Nigeria Logo" width={150} height={50} />
        <nav>
          <Link href="#features" className="mx-2 hover:underline">Features</Link>
          <Link href="#testimonials" className="mx-2 hover:underline">Testimonials</Link>
          <Link href="#faq" className="mx-2 hover:underline">FAQ</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Empower Your Research with Advanced Data Analysis</h1>
        <p className="text-xl mb-8">Helping Nigerian students unlock insights and excel in their academic pursuits</p>
        <a href="#" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">Start Analyzing Now</a>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold">Trusted by over 10,000 students from top Nigerian universities</p>
        </div>
      </section>

      {/* Key Benefits and Features */}
      <section id="features" className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Advanced Analytics</h3>
            <p>Powerful tools for in-depth data analysis and visualization</p>
          </div>
          <div className="border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
            <p>Intuitive design for easy navigation and quick results</p>
          </div>
          <div className="border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Nigerian-Focused Datasets</h3>
            <p>Access to relevant local data for your research needs</p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section id="testimonials" className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="mb-4">"DataSmart Nigeria has revolutionized my research process. It's an invaluable tool for any serious student."</p>
              <p className="font-semibold">- Chioma O., University of Lagos</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="mb-4">"The insights I've gained using this platform have significantly improved the quality of my thesis."</p>
              <p className="font-semibold">- Emeka A., University of Nigeria, Nsukka</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">How does DataSmart Nigeria work?</h3>
            <p>Our platform provides easy-to-use tools for data analysis, visualization, and interpretation, tailored for Nigerian students' research needs.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Is my data secure?</h3>
            <p>Yes, we use industry-standard encryption and security measures to protect your data and research.</p>
          </div>
          {/* Add more FAQ items as needed */}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-100 py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Research?</h2>
          <p className="text-xl mb-8">Join thousands of Nigerian students already using DataSmart Nigeria</p>
          <a href="#" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">Get Started for Free</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>Email: info@datasmartnigeria.com</p>
              <p>Phone: +234 123 456 7890</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <Link href="/terms" className="block hover:underline">Terms of Service</Link>
              <Link href="/privacy" className="block hover:underline">Privacy Policy</Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">Facebook</a>
                <a href="#" className="hover:text-gray-300">Twitter</a>
                <a href="#" className="hover:text-gray-300">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 DataSmart Nigeria. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
