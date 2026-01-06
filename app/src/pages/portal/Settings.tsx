import React, { useState } from 'react';
import { PageHeader, Card, CardHeader, CardBody, Button, Input, ComingSoon } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';

type SettingsTab = 'profile' | 'organisation' | 'notifications' | 'api' | 'security' | 'data';

const Settings: React.FC = () => {
    const { user, profile } = useAuth();
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

    const tabs: { id: SettingsTab; label: string }[] = [
        { id: 'profile', label: 'Profile' },
        { id: 'organisation', label: 'Organisation' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'api', label: 'API Keys' },
        { id: 'security', label: 'Security' },
        { id: 'data', label: 'Data Management' },
    ];

    return (
        <div>
            <PageHeader
                title="Settings"
                description="Manage your account and organisation preferences"
            />

            {/* Tabs */}
            <div
                style={{
                    display: 'flex',
                    gap: '4px',
                    marginBottom: '24px',
                    borderBottom: '1px solid var(--border-default)',
                }}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 20px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
                            color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                            fontWeight: activeTab === tab.id ? 500 : 400,
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'profile' && (
                <div style={{ maxWidth: '600px' }}>
                    <Card>
                        <CardHeader>Personal Information</CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <Input
                                    label="Full Name"
                                    defaultValue={profile?.name || ''}
                                    placeholder="Enter your name"
                                    fullWidth
                                />
                                <Input
                                    label="Email Address"
                                    value={user?.email || ''}
                                    disabled
                                    hint="Email cannot be changed"
                                    fullWidth
                                />
                                <Input
                                    label="Role"
                                    value={profile?.role || 'viewer'}
                                    disabled
                                    hint="Contact an admin to change your role"
                                    fullWidth
                                />
                                <div style={{ paddingTop: '8px' }}>
                                    <Button variant="primary">Save Changes</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card style={{ marginTop: '24px' }}>
                        <CardHeader>Password</CardHeader>
                        <CardBody>
                            <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                To change your password, we'll send a reset link to your email.
                            </p>
                            <Button variant="secondary">Send Password Reset Email</Button>
                        </CardBody>
                    </Card>
                </div>
            )}

            {activeTab === 'organisation' && (
                <div style={{ maxWidth: '600px' }}>
                    <Card>
                        <CardHeader>Organisation Details</CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <Input
                                    label="Organisation Name"
                                    defaultValue="My Organisation"
                                    placeholder="Enter organisation name"
                                    fullWidth
                                />
                                <Input
                                    label="Slug"
                                    defaultValue="my-org"
                                    placeholder="organisation-slug"
                                    hint="Used in URLs and API references"
                                    fullWidth
                                />
                                <div style={{ paddingTop: '8px' }}>
                                    <Button variant="primary">Save Changes</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <ComingSoon
                        title="Team Management"
                        description="Invite team members, manage roles, and configure access permissions."
                        style={{ marginTop: '24px' }}
                    />
                </div>
            )}

            {activeTab === 'notifications' && (
                <div style={{ maxWidth: '600px' }}>
                    <Card>
                        <CardHeader>Alert Preferences</CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { label: 'Email notifications for critical alerts', checked: true },
                                    { label: 'Email notifications for high severity alerts', checked: true },
                                    { label: 'Daily digest email', checked: false },
                                    { label: 'Weekly summary report', checked: true },
                                ].map((pref, i) => (
                                    <label
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            defaultChecked={pref.checked}
                                            style={{
                                                width: '18px',
                                                height: '18px',
                                                accentColor: 'var(--accent)',
                                            }}
                                        />
                                        <span style={{ color: 'var(--text-primary)' }}>{pref.label}</span>
                                    </label>
                                ))}
                                <div style={{ paddingTop: '12px' }}>
                                    <Button variant="primary">Save Preferences</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}

            {activeTab === 'api' && (
                <div style={{ maxWidth: '800px' }}>
                    <Card>
                        <CardHeader
                            actions={
                                <Button variant="primary" size="sm" leftIcon={<span>+</span>}>
                                    Create API Key
                                </Button>
                            }
                        >
                            API Keys
                        </CardHeader>
                        <CardBody>
                            <p style={{ margin: '0 0 20px 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                Use API keys to authenticate requests to the ArrestDelta API.
                            </p>
                            <div
                                style={{
                                    padding: '16px',
                                    background: 'var(--bg-elevated)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-subtle)',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                            Production Key
                                        </div>
                                        <code
                                            style={{
                                                fontSize: '0.8rem',
                                                color: 'var(--text-muted)',
                                                background: 'var(--bg-base)',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            ad_live_••••••••••••••••
                                        </code>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Button size="sm" variant="ghost">Reveal</Button>
                                        <Button size="sm" variant="ghost">Revoke</Button>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <ComingSoon
                        title="API Documentation"
                        description="Interactive API documentation with examples and SDKs."
                        style={{ marginTop: '24px' }}
                    />
                </div>
            )}

            {/* Security Tab - MVP Addition */}
            {activeTab === 'security' && (
                <div style={{ maxWidth: '600px' }}>
                    <Card style={{ marginBottom: '24px' }}>
                        <CardHeader>Multi-Factor Authentication</CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div>
                                    <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                        Enable MFA
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        Add an extra layer of security to your account
                                    </div>
                                </div>
                                <Button variant="secondary">Configure</Button>
                            </div>
                            <div style={{
                                padding: '12px 16px',
                                background: 'var(--warning-muted)',
                                borderRadius: '6px',
                                border: '1px solid var(--warning)',
                                fontSize: '0.8rem',
                                color: 'var(--warning)',
                            }}>
                                MFA is recommended for all accounts with admin access
                            </div>
                        </CardBody>
                    </Card>

                    <Card style={{ marginBottom: '24px' }}>
                        <CardHeader>Session Policies</CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                            Session Timeout
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            Automatically log out after inactivity
                                        </div>
                                    </div>
                                    <select
                                        style={{
                                            padding: '8px 12px',
                                            background: 'var(--input-bg)',
                                            border: '1px solid var(--input-border)',
                                            borderRadius: '6px',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        <option>30 minutes</option>
                                        <option>1 hour</option>
                                        <option>4 hours</option>
                                        <option>8 hours</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                            Single Session Only
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            Allow only one active session at a time
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">Enable</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <ComingSoon
                        title="Advanced Security Features"
                        description="IP allowlisting, login notifications, and security audit logs are coming soon."
                    />
                </div>
            )}

            {/* Data Management Tab - MVP Addition */}
            {activeTab === 'data' && (
                <div style={{ maxWidth: '600px' }}>
                    <Card style={{ marginBottom: '24px' }}>
                        <CardHeader>Data Retention</CardHeader>
                        <CardBody>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <div>
                                    <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                        Incident Data Retention
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        How long to keep resolved incidents
                                    </div>
                                </div>
                                <select
                                    style={{
                                        padding: '8px 12px',
                                        background: 'var(--input-bg)',
                                        border: '1px solid var(--input-border)',
                                        borderRadius: '6px',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    <option>1 year</option>
                                    <option>2 years</option>
                                    <option>5 years</option>
                                    <option>7 years (compliance)</option>
                                    <option>Indefinite</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                        Audit Log Retention
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        How long to keep audit logs
                                    </div>
                                </div>
                                <select
                                    style={{
                                        padding: '8px 12px',
                                        background: 'var(--input-bg)',
                                        border: '1px solid var(--input-border)',
                                        borderRadius: '6px',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    <option>1 year</option>
                                    <option>2 years</option>
                                    <option>5 years</option>
                                    <option>7 years (compliance)</option>
                                </select>
                            </div>
                        </CardBody>
                    </Card>

                    <Card style={{ marginBottom: '24px' }}>
                        <CardHeader>Data Export</CardHeader>
                        <CardBody>
                            <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                Export your organization's data in standard formats for backup or compliance purposes.
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Button variant="secondary">Export Employees (CSV)</Button>
                                <Button variant="secondary">Export Incidents (CSV)</Button>
                            </div>
                        </CardBody>
                    </Card>

                    <Card style={{ marginBottom: '24px' }}>
                        <CardHeader>Danger Zone</CardHeader>
                        <CardBody>
                            <div style={{
                                padding: '16px',
                                background: 'var(--danger-muted)',
                                borderRadius: '6px',
                                border: '1px solid var(--danger)',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: 500, color: 'var(--danger)', marginBottom: '4px' }}>
                                            Delete All Data
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            Permanently delete all organizational data. This cannot be undone.
                                        </div>
                                    </div>
                                    <Button variant="danger" size="sm">Delete Data</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Settings;
