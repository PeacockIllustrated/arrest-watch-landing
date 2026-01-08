import React from 'react';
import logoMain from '../assets/logo_main.png';
import founder from '../assets/founder.png';
import cofounder from '../assets/co-founder.png';

interface SignatureProps {
    name: string;
    title: string;
    email: string;
    phone?: string;
    image: string;
}

const SignatureBlock: React.FC<SignatureProps> = ({ name, title, email, phone, image }) => (
    <div style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)',
        padding: '40px 48px',
        borderLeft: '4px solid #e40028',
        width: '75vw',
        minWidth: '500px',
        maxWidth: '900px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(228,0,40,0.1)',
    }}>
        {/* Background accent */}
        <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(228,0,40,0.08) 0%, transparent 70%)',
            pointerEvents: 'none'
        }}></div>

        {/* Grid pattern overlay */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header with Photo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', marginBottom: '28px' }}>
                <div style={{
                    position: 'relative',
                    width: '90px',
                    height: '90px',
                }}>
                    <img
                        src={image}
                        alt={name}
                        style={{
                            width: '90px',
                            height: '90px',
                            objectFit: 'cover',
                            border: '2px solid #333',
                            filter: 'grayscale(100%)',
                            position: 'relative',
                            zIndex: 1
                        }}
                    />
                    {/* Photo accent */}
                    <div style={{
                        position: 'absolute',
                        top: '4px',
                        left: '4px',
                        right: '-4px',
                        bottom: '-4px',
                        border: '1px solid #e40028',
                        opacity: 0.5,
                        zIndex: 0
                    }}></div>
                </div>
                <div>
                    <div style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#ffffff',
                        letterSpacing: '1px',
                        marginBottom: '6px',
                        textTransform: 'uppercase'
                    }}>
                        {name}
                    </div>
                    <div style={{
                        fontSize: '13px',
                        color: '#e40028',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontWeight: '500'
                    }}>
                        {title}
                    </div>
                </div>
            </div>

            {/* Divider with accent */}
            <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, #e40028 0%, #333 30%, transparent 100%)',
                margin: '24px 0'
            }}></div>

            {/* Logo & Company Row */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <img
                        src={logoMain}
                        alt="ArrestDelta"
                        style={{ height: '50px', width: 'auto' }}
                    />
                    <div style={{
                        borderLeft: '1px solid #333',
                        paddingLeft: '20px',
                        height: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <span style={{
                            fontSize: '11px',
                            color: '#ffffff',
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                        }}>
                            Continuous Criminal Intelligence
                        </span>
                        <span style={{
                            fontSize: '10px',
                            color: '#cccccc',
                            letterSpacing: '1px',
                            marginTop: '2px'
                        }}>
                            Enterprise Trust & Safety
                        </span>
                    </div>
                </div>

                {/* Contact Details - Right aligned */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '6px',
                    fontSize: '14px'
                }}>
                    <a
                        href={`mailto:${email}`}
                        style={{
                            color: '#e40028',
                            textDecoration: 'none',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {email}
                    </a>
                    {phone && (
                        <a
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            style={{
                                color: '#ffffff',
                                textDecoration: 'none',
                                fontFamily: 'monospace',
                                fontSize: '13px'
                            }}
                        >
                            {phone}
                        </a>
                    )}
                    <a
                        href="https://arrestdelta.com"
                        style={{
                            color: '#cccccc',
                            textDecoration: 'none',
                            fontSize: '12px'
                        }}
                    >
                        arrestdelta.com
                    </a>
                </div>
            </div>

            {/* Bottom Tagline Bar */}
            <div style={{
                marginTop: '24px',
                padding: '16px 20px',
                background: 'rgba(228,0,40,0.08)',
                borderLeft: '2px solid #e40028',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <span style={{
                    fontSize: '12px',
                    color: '#ffffff',
                    fontStyle: 'italic',
                    letterSpacing: '0.5px'
                }}>
                    From arrest to alert — instantly.
                </span>
                <span style={{
                    fontSize: '10px',
                    color: '#cccccc',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    // SECURE CHANNEL
                </span>
            </div>
        </div>
    </div>
);

const EmailSignature: React.FC = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5rem',
            padding: '4rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Michael's Signature */}
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    color: '#e40028',
                    fontSize: '11px',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    fontWeight: '500'
                }}>
                    ▸ Michael King
                </div>
                <SignatureBlock
                    name="Michael King"
                    title="Founder & CEO"
                    email="michael@arrestdelta.com"
                    phone="+44 7963 520703"
                    image={founder}
                />
            </div>

            {/* Tom's Signature */}
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    color: '#e40028',
                    fontSize: '11px',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    fontWeight: '500'
                }}>
                    ▸ Tom Peacock
                </div>
                <SignatureBlock
                    name="Tom Peacock"
                    title="Co-Founder & CTO"
                    email="tom@arrestdelta.com"
                    image={cofounder}
                />
            </div>
        </div>
    );
};

export default EmailSignature;
