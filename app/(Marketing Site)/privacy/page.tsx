import FooterFull from '@/components/Footers/FooterFull';
import HeaderCentered from '@/components/HeaderCentered';
import NavBar1 from '@/components/NavBarTW/NavBar1';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - EventJacket',
    description:
        "Your privacy is important to us. It is EventJacket's policy to respect your privacy regarding any information we may collect from you across our website, http://eventjacket.com, and other sites we own and operate."
};

export default function PrivacyPolicy() {
    return (
        <>
            <NavBar1 />
            <HeaderCentered
                title="Privacy Policy"
                description="Your privacy is important to us. It is EventJacket's policy to respect your privacy regarding any information we may collect from you across our website, http://eventjacket.com, and other sites we own and operate."
            />
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-7 max-w-7xl bg-white p-6 text-gray-800  ">
                    <p className="mb-6">
                        At EventJacket, accessible from EventJacket.com, one of our main priorities
                        is the privacy of our visitors. This Privacy Policy document contains types
                        of information that is collected and recorded by Event Jacket and how we use
                        it.
                    </p>

                    <p className="mb-6">
                        If you have additional questions or require more information about our
                        Privacy Policy, do not hesitate to contact us.
                    </p>

                    <p className="mb-6">
                        This Privacy Policy applies only to our online activities and is valid for
                        visitors to our website with regards to the information that they shared
                        and/or collect in Event Jacket. This policy is not applicable to any
                        information collected offline or via channels other than this website.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Consent</h2>
                    <p className="mb-6">
                        By using our website, you hereby consent to our Privacy Policy and agree to
                        its terms.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Information we collect</h2>
                    <p className="mb-6">
                        The personal information that you are asked to provide, and the reasons why
                        you are asked to provide it, will be made clear to you at the point we ask
                        you to provide your personal information.
                    </p>

                    <p className="mb-6">
                        If you contact us directly, we may receive additional information about you
                        such as your name, email address, phone number, the contents of the message
                        and/or attachments you may send us, and any other information you may choose
                        to provide.
                    </p>

                    <p className="mb-6">
                        When you register for an Account, we may ask for your contact information,
                        including items such as name, company name, address, email address, and
                        telephone number.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">How we use your information</h2>
                    <p className="mb-6">
                        We use the information we collect in various ways, including to:
                    </p>

                    <ul className="mb-6 list-inside list-disc">
                        <li>Provide, operate, and maintain our website</li>
                        <li>Improve, personalize, and expand our website</li>
                        <li>Understand and analyze how you use our website</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>
                            Communicate with you, either directly or through one of our partners,
                            including for customer service, to provide you with updates and other
                            information relating to the website, and for marketing and promotional
                            purposes
                        </li>
                        <li>Send you emails</li>
                        <li>Find and prevent fraud</li>
                    </ul>

                    <h2 className="mb-4 text-xl font-bold">Log Files</h2>
                    <p className="mb-6">
                        Event Jacket follows a standard procedure of using log files. These files
                        log visitors when they visit websites. All hosting companies do this and a
                        part of hosting services analytics. The information collected by log files
                        include internet protocol (IP) addresses, browser type, Internet Service
                        Provider (ISP), date and time stamp, referring/exit pages, and possibly the
                        number of clicks. These are not linked to any information that is personally
                        identifiable. The purpose of the information is for analyzing trends,
                        administering the site, tracking users movement on the website, and
                        gathering demographic information.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">
                        Advertising Partners Privacy Policies
                    </h2>
                    <p className="mb-6">
                        You may consult this list to find the Privacy Policy for each of the
                        advertising partners of Event Jacket.
                    </p>

                    <p className="mb-6">
                        Third-party ad servers or ad networks uses technologies like cookies,
                        JavaScript, or Web Beacons that are used in their respective advertisements
                        and links that appear on Event Jacket, which are sent directly to users'
                        browser. They automatically receive your IP address when this occurs. These
                        technologies are used to measure the effectiveness of their advertising
                        campaigns and/or to personalize the advertising content that you see on
                        websites that you visit.
                    </p>

                    <p className="mb-6">
                        Note that Event Jacket has no access to or control over these cookies that
                        are used by third-party advertisers.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Third Party Privacy Policies</h2>
                    <p className="mb-6">
                        EventJacket's Privacy Policy does not apply to other advertisers or
                        websites. Thus, we are advising you to consult the respective Privacy
                        Policies of these third-party ad servers for more detailed information. It
                        may include their practices and instructions about how to opt-out of certain
                        options.
                    </p>

                    <p className="mb-6">
                        You can choose to disable cookies through your individual browser options.
                        To know more detailed information about cookie management with specific web
                        browsers, it can be found at the browsers' respective websites.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">
                        CCPA Privacy Rights (Do Not Sell My Personal Information)
                    </h2>
                    <p className="mb-6">
                        Under the CCPA, among other rights, California consumers have the right to:
                    </p>

                    <ul className="mb-6 list-inside list-disc">
                        <li>
                            Request that a business that collects a consumer's personal data
                            disclose the categories and specific pieces of personal data that a
                            business has collected about consumers.
                        </li>
                        <li>
                            Request that a business delete any personal data about the consumer that
                            a business has collected.
                        </li>
                        <li>
                            Request that a business that sells a consumer's personal data, not sell
                            the consumer's personal data.
                        </li>
                    </ul>

                    <p className="mb-6">
                        If you make a request, we have one month to respond to you. If you would
                        like to exercise any of these rights, please contact us.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">GDPR Data Protection Rights</h2>
                    <p className="mb-6">
                        We would like to make sure you are fully aware of all of your data
                        protection rights. Every user is entitled to the following:
                    </p>

                    <ul className="mb-6 list-inside list-disc">
                        <li>
                            The right to access: You have the right to request copies of your
                            personal data. We may charge you a small fee for this service.
                        </li>
                        <li>
                            The right to rectification: You have the right to request that we
                            correct any information you believe is inaccurate. You also have the
                            right to request that we complete the information you believe is
                            incomplete.
                        </li>
                        <li>
                            The right to erasure: You have the right to request that we erase your
                            personal data, under certain conditions.
                        </li>
                        <li>
                            The right to restrict processing: You have the right to request that we
                            restrict the processing of your personal data, under certain conditions.
                        </li>
                        <li>
                            The right to object to processing: You have the right to object to our
                            processing of your personal data, under certain conditions.
                        </li>
                        <li>
                            The right to data portability: You have the right to request that we
                            transfer the data that we have collected to another organization, or
                            directly to you, under certain conditions.
                        </li>
                    </ul>

                    <p className="mb-6">
                        If you make a request, we have one month to respond to you. If you would
                        like to exercise any of these rights, please contact us.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Children's Information</h2>
                    <p className="mb-6">
                        Another part of our priority is adding protection for children while using
                        the internet. We encourage parents and guardians to observe, participate in,
                        and/or monitor and guide their online activity.
                    </p>

                    <p className="mb-6">
                        Event Jacket does not knowingly collect any Personal Identifiable
                        Information from children under the age of 13. If you think that your child
                        provided this kind of information on our website, we strongly encourage you
                        to contact us immediately and we will do our best efforts to promptly remove
                        such information from our records.
                    </p>
                </div>
            </div>
            <FooterFull />
        </>
    );
}
