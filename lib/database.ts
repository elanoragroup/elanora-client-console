import { supabase, supabaseAdmin } from './supabase'
import { 
  User, 
  Service, 
  ServiceRequest, 
  Document, 
  ComplianceItem, 
  Project, 
  Invoice, 
  Report, 
  Message, 
  Feedback,
  DatabaseResponse,
  PaginatedResponse 
} from './types'

// User operations
export const userService = {
  async getCurrentUser(): Promise<DatabaseResponse<User>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { data: null, error: 'No authenticated user' }
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to get user' }
    }
  },

  async updateUser(updates: Partial<User>): Promise<DatabaseResponse<User>> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { data: null, error: 'No authenticated user' }
      }

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to update user' }
    }
  }
}

// Service operations
export const serviceService = {
  async getServices(): Promise<DatabaseResponse<Service[]>> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          category:service_categories(*),
          assigned_ca:users!assigned_ca_id(*)
        `)
        .order('created_at', { ascending: false })

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to get services' }
    }
  },

  async createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<DatabaseResponse<Service>> {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert(service)
        .select(`
          *,
          category:service_categories(*),
          assigned_ca:users!assigned_ca_id(*)
        `)
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to create service' }
    }
  },

  async updateService(id: string, updates: Partial<Service>): Promise<DatabaseResponse<Service>> {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          category:service_categories(*),
          assigned_ca:users!assigned_ca_id(*)
        `)
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to update service' }
    }
  },

  async deleteService(id: string): Promise<DatabaseResponse<boolean>> {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (error) return { data: null, error: error.message }
      return { data: true, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to delete service' }
    }
  }
}

// Service Request operations
export const serviceRequestService = {
  async getServiceRequests(): Promise<DatabaseResponse<ServiceRequest[]>> {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          assigned_ca:users!assigned_ca_id(*)
        `)
        .order('created_at', { ascending: false })

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to get service requests' }
    }
  },

  async createServiceRequest(request: Omit<ServiceRequest, 'id' | 'created_at' | 'updated_at'>): Promise<DatabaseResponse<ServiceRequest>> {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .insert(request)
        .select(`
          *,
          assigned_ca:users!assigned_ca_id(*)
        `)
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to create service request' }
    }
  },

  async updateServiceRequest(id: string, updates: Partial<ServiceRequest>): Promise<DatabaseResponse<ServiceRequest>> {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          assigned_ca:users!assigned_ca_id(*)
        `)
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to update service request' }
    }
  }
}

// Document operations
export const documentService = {
  async getDocuments(serviceId?: string, requestId?: string): Promise<DatabaseResponse<Document[]>> {
    try {
      let query = supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })

      if (serviceId) {
        query = query.eq('service_id', serviceId)
      }
      if (requestId) {
        query = query.eq('request_id', requestId)
      }

      const { data, error } = await query

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to get documents' }
    }
  },

  async uploadDocument(document: Omit<Document, 'id' | 'created_at'>): Promise<DatabaseResponse<Document>> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert(document)
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to upload document' }
    }
  },

  async deleteDocument(id: string): Promise<DatabaseResponse<boolean>> {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)

      if (error) return { data: null, error: error.message }
      return { data: true, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to delete document' }
    }
  }
}

// Compliance operations
export const complianceService = {
  async getComplianceItems(): Promise<DatabaseResponse<ComplianceItem[]>> {
    try {
      const { data, error } = await supabase
        .from('compliance_items')
        .select('*')
        .order('due_date', { ascending: true })

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to get compliance items' }
    }
  },

  async createComplianceItem(item: Omit<ComplianceItem, 'id' | 'created_at' | 'updated_at'>): Promise<DatabaseResponse<ComplianceItem>> {
    try {
      const { data, error } = await supabase
        .from('compliance_items')
        .insert(item)
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to create compliance item' }
    }
  },

  async updateComplianceItem(id: string, updates: Partial<ComplianceItem>): Promise<DatabaseResponse<ComplianceItem>> {
    try {
      const { data, error } = await supabase
        .from('compliance_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to update compliance item' }
    }
  }
}

// Project operations
export const projectService = {
  async getProjects(): Promise<DatabaseResponse<Project[]>> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          assigned_ca:users!assigned_ca_id(*)
        `)
        .order('created_at', { ascending: false })

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to get projects' }
    }
  },

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<DatabaseResponse<Project>> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select(`
          *,
          assigned_ca:users!assigned_ca_id(*)
        `)
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to create project' }
    }
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<DatabaseResponse<Project>> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          assigned_ca:users!assigned_ca_id(*)
        `)
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to update project' }
    }
  }
}

// Invoice operations
export const invoiceService = {
  async getInvoices(): Promise<DatabaseResponse<Invoice[]>> {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to get invoices' }
    }
  },

  async createInvoice(invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>): Promise<DatabaseResponse<Invoice>> {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .insert(invoice)
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to create invoice' }
    }
  },

  async updateInvoice(id: string, updates: Partial<Invoice>): Promise<DatabaseResponse<Invoice>> {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to update invoice' }
    }
  }
}

// Message operations
export const messageService = {
  async getMessages(): Promise<DatabaseResponse<Message[]>> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:users!sender_id(*),
          receiver:users!receiver_id(*)
        `)
        .order('created_at', { ascending: false })

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to get messages' }
    }
  },

  async sendMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<DatabaseResponse<Message>> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert(message)
        .select(`
          *,
          sender:users!sender_id(*),
          receiver:users!receiver_id(*)
        `)
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to send message' }
    }
  },

  async markAsRead(id: string): Promise<DatabaseResponse<boolean>> {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id)

      if (error) return { data: null, error: error.message }
      return { data: true, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to mark message as read' }
    }
  }
}

// Feedback operations
export const feedbackService = {
  async getFeedback(): Promise<DatabaseResponse<Feedback[]>> {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to get feedback' }
    }
  },

  async createFeedback(feedback: Omit<Feedback, 'id' | 'created_at'>): Promise<DatabaseResponse<Feedback>> {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .insert(feedback)
        .select()
        .single()

      if (error) return { data: null, error: error.message }
      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Failed to create feedback' }
    }
  }
}
