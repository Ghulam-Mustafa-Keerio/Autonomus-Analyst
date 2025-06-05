import { ShieldCheck, KeyRound, Lock, UserCheck, Landmark } from 'lucide-react';
import { SectionWrapper } from '@/components/common/SectionWrapper';

export function SecurityOverviewSection() {
  return (
    <SectionWrapper title="Security & Compliance Strategy" icon={ShieldCheck}>
      <p className="mb-6 text-muted-foreground">
        Security and ethical considerations are paramount in the Autonomous Analyst platform. Our strategy encompasses robust authentication, data protection, and adherence to ethical AI principles.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <UserCheck className="h-8 w-8 mr-4 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Authentication & Authorization</h3>
            <p className="text-sm text-foreground/80">
              Utilizing Firebase Authentication for secure user identity management, supporting various providers (email/password, OAuth). Firebase Security Rules for Firestore and Cloud Storage enforce granular access control, ensuring data is only accessible by authorized users and agents.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Lock className="h-8 w-8 mr-4 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Data Encryption & Protection</h3>
            <p className="text-sm text-foreground/80">
              Data is encrypted in transit (via HTTPS) and at rest by default within Firebase services. Sensitive data handling procedures are implemented throughout the data lifecycle. Regular security assessments and vulnerability scanning are planned.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <KeyRound className="h-8 w-8 mr-4 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Ethical AI Practices</h3>
            <p className="text-sm text-foreground/80">
              The platform is designed with Explainable AI (XAI) principles in mind, aiming to provide transparency into the agent's decision-making processes. Audit trails of agent actions and analytical outputs are maintained in Firestore for accountability. Measures for bias detection and mitigation in AI models are part of the ongoing development roadmap.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Landmark className="h-8 w-8 mr-4 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Compliance & Governance</h3>
            <p className="text-sm text-foreground/80">
              The platform aims to adhere to relevant data privacy regulations (e.g., GDPR, CCPA) by leveraging Firebase's compliance features and implementing appropriate data handling policies. Data residency and governance requirements are considered in the system architecture.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
