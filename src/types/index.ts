// User related types
export interface User {
    id: string;
    username: string;
    fullName: string;
    email: string;
    role: UserRole;
    departmentId: string;
}

export type UserRole = 'ADMIN' | 'OFFICER';

export interface UserCreation extends Omit<User, 'id'> {
    password: string;
}

// Department related types
export interface Department {
    id: string;
    name: string;
    code: string;
    parentDepartmentId?: string;
}

// File related types
export interface File {
    id: string;
    fileNumber: string;
    title: string;
    description: string;
    status: FileStatus;
    qrCodeUrl: string;
    initiatorId: string;
    createdAt: string;
    currentStep: number;
    completedAt?: string;
}

export type FileStatus = 
    | 'PENDING'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'ARCHIVED';

export interface FileCreationData {
    title: string;
    description: string;
    initialDocuments: File[];
    workflow: WorkflowStep[];
}

// Workflow related types
export interface WorkflowStep {
    id: string;
    fileId: string;
    stepNumber: number;
    departmentId: string;
    officerId: string;
    status: WorkflowStepStatus;
    notes?: string;
    receivedAt?: string;
    completedAt?: string;
}

export type WorkflowStepStatus = 
    | 'PENDING'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'SKIPPED';

export interface WorkflowDefinition {
    fileId: string;
    steps: WorkflowStep[];
}

// Document related types
export interface FileDocument {
    id: string;
    fileId: string;
    documentUrl: string;
    uploadedBy: string;
    documentType: string;
    uploadDate: string;
}

// Dashboard related types
export interface DashboardFilters {
    status?: FileStatus;
    department?: string;
    dateRange?: {
        start: string;
        end: string;
    };
    searchTerm?: string;
}

// Public portal types
export interface PublicFileQuery {
    fileNumber: string;
}

export interface PublicFileStatus {
    file: File;
    currentLocation: {
        department: Department;
        officer: User;
    };
    completedSteps: WorkflowStep[];
    remainingSteps: WorkflowStep[];
    estimatedCompletionDate?: string;
}

// Authentication types
export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

// System settings types
export interface SystemSettings {
    allowedFileTypes: string[];
    maxFileSize: number; // in MB
    autoArchiveDays: number;
    notificationSettings: {
        email: boolean;
        sms: boolean;
        inApp: boolean;
    };
}

// API response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Notification types
export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    message: string;
    isRead: boolean;
    createdAt: string;
    metadata?: Record<string, any>;
}

export type NotificationType = 
    | 'FILE_RECEIVED'
    | 'FILE_COMPLETED'
    | 'FILE_DELAYED'
    | 'WORKFLOW_UPDATED'
    | 'MENTION'
    | 'SYSTEM';

// Audit log types
export interface AuditLog {
    id: string;
    userId: string;
    action: AuditAction;
    fileId?: string;
    details: Record<string, any>;
    ipAddress: string;
    timestamp: string;
}

export type AuditAction = 
    | 'FILE_CREATED'
    | 'FILE_UPDATED'
    | 'FILE_DELETED'
    | 'WORKFLOW_UPDATED'
    | 'STATUS_CHANGED'
    | 'DOCUMENT_UPLOADED'
    | 'DOCUMENT_DELETED'
    | 'USER_LOGIN'
    | 'USER_LOGOUT'
    | 'USER_CREATED'
    | 'USER_UPDATED'
    | 'USER_DELETED'
    | 'DEPARTMENT_CREATED'
    | 'DEPARTMENT_UPDATED'
    | 'DEPARTMENT_DELETED'
    | 'SETTINGS_UPDATED';

// Error types
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
}

// Permission types
export interface Permission {
    resource: string;
    actions: string[];
}

export interface RolePermissions {
    [key: string]: Permission[];
}

// Search types
export interface SearchFilters {
    status?: FileStatus[];
    departments?: string[];
    dateRange?: {
        start: string;
        end: string;
    };
    users?: string[];
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface SearchResult {
    files: File[];
    total: number;
    page: number;
    pageSize: number;
}

// Report types
export interface ReportFilters {
    startDate: string;
    endDate: string;
    departments?: string[];
    fileStatus?: FileStatus[];
    groupBy?: 'department' | 'status' | 'user';
}

export interface ReportData {
    summary: {
        totalFiles: number;
        completedFiles: number;
        averageProcessingTime: number;
    };
    details: Record<string, number>;
    timeline: Array<{
        date: string;
        count: number;
    }>;
}

export {};
