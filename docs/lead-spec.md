// Turnstile verification interface
export interface TurnstileVerification {
sitekey: string;
token: string;
}

export type LeadType =
| 'InformationRequest'
| 'TestDrive'
| 'OfferRequest'
| 'TradeInRequest'
| 'LeaseRequest'
| 'ContactMe'
| 'Bid'
| 'Complaint'
| 'Maintenance'
| 'Appraisal'
| 'Other';

export interface Prospect {
firstName?: string;
lastName: string; // required
emailAddress: string; // required
phoneNumber?: string;
address?: string;
company?: string;
preferredCommunicationChannel?: 'Email' | 'Voice' | 'SMS' | 'Whatsapp';
}

// Lead payload without Turnstile fields
export interface LeadPayload {
// Required lead fields
initiative: string;
source: string;
leadType: LeadType;
dealerId: string;
prospect: Prospect;

    // Optional lead fields
    title?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tradeInVehicles?: any[]; // You might want to define a specific type for this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    desiredVehicles?: any[]; // You might want to define a specific type for this
    customerMessage?: string;
    channel?: 'Web' | 'Phone' | 'Email' | 'SocialMedia' | 'Post' | 'WhatsApp' | 'Sms' | 'Other';
    campaign?: string;
    leadDepartment?: 'Sales' | 'AfterSales' | 'Stockroom' | 'Unknown';
    correlationId?: string;
    externalLink?: string;
    isExternalSystemLeading?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    remarks?: any[]; // You might want to define a specific type for this
    advertisementLink?: string;

}

// Combined interface for the create lead endpoint
export interface CreateLeadPayload extends TurnstileVerification, LeadPayload {}
