import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <h1 className="font-raleway text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
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
                  At Webstix Design Private Limited ("WDPL"), we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We may collect the following types of information:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-raleway text-xl font-semibold mb-2">Personal Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>Name, email address, and phone number</li>
                      <li>Company name and job title</li>
                      <li>Billing and payment information</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-raleway text-xl font-semibold mb-2">Technical Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>IP address and browser type</li>
                      <li>Device information and operating system</li>
                      <li>Cookies and usage data</li>
                      <li>Pages visited and time spent on our website</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We use the collected information for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Providing and improving our services</li>
                  <li>Processing transactions and sending confirmations</li>
                  <li>Communicating with you about projects and updates</li>
                  <li>Responding to inquiries and support requests</li>
                  <li>Sending marketing communications (with your consent)</li>
                  <li>Analyzing website usage and optimizing user experience</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Service providers who assist in our operations</li>
                  <li>Payment processors for transaction handling</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">5. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences. Disabling cookies may limit certain website functionalities.
                </p>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">6. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">7. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">8. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict certain processing activities</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Lodge a complaint with a data protection authority</li>
                </ul>
              </div>

              {/* Third-Party Links */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">9. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">10. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it.
                </p>
              </div>

              {/* Changes to Policy */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website with a new "Last updated" date.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="font-raleway text-2xl font-bold mb-4">12. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicy;
