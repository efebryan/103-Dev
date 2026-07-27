import { createClient } from '@/lib/supabase/server'

// ─── USER PROFILE ────────────────────────────────────────────────────────────

export async function getUserProfile() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

// ─── TEMPLATES ───────────────────────────────────────────────────────────────

export async function getTemplates() {
  const supabase = await createClient()
  
  const { data: templates, error } = await supabase
    .from('templates')
    .select(`
      *,
      users:author_id(full_name, avatar_url)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching templates:', error)
    return []
  }

  return templates
}

export async function getPublishedTemplates() {
  const supabase = await createClient()

  const { data: templates, error } = await supabase
    .from('templates')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching published templates:', error)
    return []
  }

  return templates
}

// ─── WISHLIST ─────────────────────────────────────────────────────────────────

export async function getUserWishlist() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: wishlist, error } = await supabase
    .from('wishlists')
    .select(`
      created_at,
      templates (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching wishlist:', error)
    return []
  }

  return wishlist
}

// ─── DOWNLOADS ────────────────────────────────────────────────────────────────

export async function getUserDownloads() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: downloads, error } = await supabase
    .from('downloads')
    .select(`
      purchased_at,
      templates (*)
    `)
    .eq('user_id', user.id)
    .order('purchased_at', { ascending: false })

  if (error) {
    console.error('Error fetching downloads:', error)
    return []
  }

  return downloads
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────

export async function getUserOrders() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      templates (id, title, thumbnail_url)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return orders
}

export async function getAllOrders() {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      users (id, full_name, avatar_url),
      templates (id, title)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all orders:', error)
    return []
  }

  return orders
}

// ─── LICENSES ─────────────────────────────────────────────────────────────────

export async function getUserLicenses() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: licenses, error } = await supabase
    .from('licenses')
    .select(`
      *,
      templates (id, title, thumbnail_url)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching licenses:', error)
    return []
  }

  return licenses
}

export async function getAllLicenses() {
  const supabase = await createClient()

  const { data: licenses, error } = await supabase
    .from('licenses')
    .select(`
      *,
      users (id, full_name),
      templates (id, title)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all licenses:', error)
    return []
  }

  return licenses
}

// ─── SUPPORT TICKETS ──────────────────────────────────────────────────────────

export async function getUserTickets() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: tickets, error } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tickets:', error)
    return []
  }

  return tickets
}

export async function getAllTickets() {
  const supabase = await createClient()

  const { data: tickets, error } = await supabase
    .from('support_tickets')
    .select(`
      *,
      users (id, full_name, avatar_url)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all tickets:', error)
    return []
  }

  return tickets
}

export async function createSupportTicket(subject: string, category: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('support_tickets')
    .insert({ user_id: user.id, subject, category })
    .select()
    .single()

  if (error) {
    console.error('Error creating ticket:', error)
    return { error: error.message }
  }

  return { data }
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

export async function getUserNotifications() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: notifications, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching notifications:', error)
    return []
  }

  return notifications
}

export async function markNotificationRead(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)

  if (error) {
    console.error('Error marking notification as read:', error)
    return { error: error.message }
  }

  return { success: true }
}

export async function markAllNotificationsRead() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.id)

  if (error) {
    console.error('Error marking all notifications read:', error)
    return { error: error.message }
  }

  return { success: true }
}

// ─── ACTIVITY LOG ─────────────────────────────────────────────────────────────

export async function getUserActivity() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: activity, error } = await supabase
    .from('activity_log')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching activity:', error)
    return []
  }

  return activity
}

export async function getAllActivity() {
  const supabase = await createClient()

  const { data: activity, error } = await supabase
    .from('activity_log')
    .select(`
      *,
      users (id, full_name, avatar_url)
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error fetching all activity:', error)
    return []
  }

  return activity
}

// ─── REVIEWS ─────────────────────────────────────────────────────────────────

export async function getTemplateReviews(templateId: string) {
  const supabase = await createClient()

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select(`
      *,
      users (id, full_name, avatar_url)
    `)
    .eq('template_id', templateId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  return reviews
}

export async function getAllReviews() {
  const supabase = await createClient()

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select(`
      *,
      users (id, full_name, avatar_url),
      templates (id, title)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all reviews:', error)
    return []
  }

  return reviews
}

// ─── ADMIN: ALL USERS ─────────────────────────────────────────────────────────

export async function getAllUsers() {
  const supabase = await createClient()

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all users:', error)
    return []
  }

  return users
}
