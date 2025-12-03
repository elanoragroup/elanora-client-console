export interface User {
  id: string
  email: string
  full_name?: string
  company_name?: string
  company_logo?: string
  phone?: string
  avatar_url?: string
  role: 'client' | 'admin' | 'ca'
  created_at: string
  updated_at: string
}

export interface ServiceCategory {
  id: string
  name: string
  description?: string
  icon?: string
  color?: string
  created_at: string
}

export interface Service {
  id: string
  user_id: string
  category_id?: string
  title: string
  description?: string
  status: 'active' | 'completed' | 'cancelled' | 'on_hold'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  financial_year?: string
  quarter?: string
  preferred_completion_date?: string
  actual_start_date?: string
  actual_completion_date?: string
  assigned_ca_id?: string
  progress_percentage: number
  estimated_hours?: number
  actual_hours?: number
  cost?: number
  notes?: string
  created_at: string
  updated_at: string
  category?: ServiceCategory
  assigned_ca?: User
}

export interface ServiceRequest {
  id: string
  user_id: string
  service_type: string
  financial_year?: string
  quarter?: string
  preferred_completion_date?: string
  priority: 'normal' | 'urgent'
  subject: string
  description: string
  status: 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed'
  assigned_ca_id?: string
  response_notes?: string
  created_at: string
  updated_at: string
  assigned_ca?: User
}

export interface Document {
  id: string
  user_id: string
  service_id?: string
  request_id?: string
  filename: string
  original_filename: string
  file_path: string
  file_size?: number
  mime_type?: string
  document_type?: 'invoice' | 'receipt' | 'contract' | 'report' | 'other'
  uploaded_by?: string
  created_at: string
}

export interface ComplianceItem {
  id: string
  user_id: string
  service_id?: string
  title: string
  description?: string
  due_date?: string
  status: 'pending' | 'completed' | 'overdue' | 'cancelled'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  category?: string
  regulatory_body?: string
  penalty_amount?: number
  completed_date?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  description?: string
  status: 'active' | 'completed' | 'on_hold' | 'cancelled'
  start_date?: string
  end_date?: string
  budget?: number
  actual_cost?: number
  progress_percentage: number
  assigned_ca_id?: string
  created_at: string
  updated_at: string
  assigned_ca?: User
}

export interface Invoice {
  id: string
  user_id: string
  service_id?: string
  project_id?: string
  invoice_number: string
  amount: number
  tax_amount: number
  total_amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  due_date?: string
  paid_date?: string
  payment_method?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  user_id: string
  title: string
  description?: string
  report_type?: 'compliance' | 'financial' | 'service' | 'custom'
  data?: any
  generated_by?: string
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  subject?: string
  content: string
  message_type: 'text' | 'file' | 'system'
  is_read: boolean
  parent_message_id?: string
  created_at: string
  sender?: User
  receiver?: User
}

export interface Feedback {
  id: string
  user_id: string
  service_id?: string
  rating: number
  comment?: string
  category?: 'service_quality' | 'communication' | 'timeliness' | 'pricing' | 'other'
  status: 'pending' | 'reviewed' | 'resolved'
  created_at: string
}

export interface DatabaseResponse<T> {
  data: T | null
  error: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  total_pages: number
}
