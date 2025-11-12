import Layout from "@/components/layout/Layout";

const TermsAndConditions = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <h1 className="font-raleway text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms and Conditions
            </h1>
            <p className="font-source text-lg text-muted-foreground max-w-3xl">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8 font-source text-foreground">
              {/* Introduction */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Webstix Design Private Limited ("WDPL", "we", "our", or "us"). These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.
                </p>
              </div>

              {/* Services */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">2. Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  WDPL provides web design, development, and digital solutions. Our services include but are not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Website design and development</li>
                  <li>Web application development</li>
                  <li>Digital marketing solutions</li>
                  <li>UI/UX design services</li>
                  <li>Maintenance and support services</li>
                </ul>
              </div>

              {/* User Obligations */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">3. User Obligations</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  By using our services, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not infringe on intellectual property rights</li>
                  <li>Not transmit malicious code or harmful content</li>
                </ul>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">4. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, designs, code, and materials created by WDPL remain our intellectual property until full payment is received. Upon completion of payment, ownership rights are transferred to the client as per the agreed terms in the project contract.
                </p>
              </div>

              {/* Payment Terms */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">5. Payment Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Payment terms are established in individual project agreements. Generally:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Payment schedules are outlined in project proposals</li>
                  <li>Late payments may incur additional charges</li>
                  <li>Work may be suspended for non-payment</li>
                  <li>Refunds are subject to the terms of individual contracts</li>
                </ul>
              </div>

              {/* Liability */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  WDPL shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by the client for the specific service in question.
                </p>
              </div>

              {/* Termination */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">7. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Either party may terminate services with written notice as specified in the project agreement. Upon termination, the client is responsible for payment of all work completed up to the termination date.
                </p>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of the updated terms.
                </p>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">9. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms and Conditions, please contact us at:
                </p>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <p>Webstix Design Private Limited</p>
                  <p>Chennai Office: 286/1, Rajiv Gandhi Salai, Nehru Nagar, Perungudi, Chennai, 600096</p>
                  <p>Coimbatore Office: 2nd Floor, MAPA Center, Mikro Grafeio opposite LuLu Hypermarket, Coimbatore, 641045</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;