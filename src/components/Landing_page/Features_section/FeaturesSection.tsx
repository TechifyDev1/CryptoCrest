import React from 'react';
import insight from '../../../assets/landing_page/insights.svg';
import monitor from '../../../assets/landing_page/monitor.svg';
import security from '../../../assets/landing_page/security.svg';
import Feature from './Feature';
import './Features.css';

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <h2 className="title" style={{ textAlign: 'left' }}>
        Why People loves us
      </h2>
      <div className="features">
        <Feature
          title="Monitor Every Crypto Transaction in Real-Time"
          description="Stay up to date with your cryptocurrency spending. CryptoCrest lets you track every transaction as it happens, ensuring you always have accurate and up-to-date records of your financial activities."
          img={monitor}
        />
        <Feature
          title="Gain Valuable Insights into Your Portfolio"
          description="Visualize your crypto spending with powerful charts and analytics. Understand your financial habits and optimize your portfolio for smarter decision-making."
          img={insight}
        />
        <Feature
          title="Your Data, Secure and Easy to Manage"
          description="Experience a seamless and secure interface designed for hassle-free crypto management. CryptoCrest ensures your data is protected while offering an intuitive user experience."
          img={security}
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
