'use client'

import { useState, useMemo } from 'react'
import { mockDocuments } from '@/lib/data'
import { Search, Filter, FileText, Calendar, User, Tag } from 'lucide-react'

const categories = [
  'All Categories',
  'Daily Briefs',
  'Weekly Reports', 
  'Market Alerts',
  'Health Reports',
  'Business Intelligence'
]

function DocumentCard({ doc, onClick }: { doc: any; onClick: () => void }) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Daily Briefs': 'bg-blue-500',
      'Weekly Reports': 'bg-green-500',
      'Market Alerts': 'bg-red-500',
      'Health Reports': 'bg-purple-500',
      'Business Intelligence': 'bg-yellow-500'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-500'
  }

  return (
    <div 
      className="card p-4 hover:bg-border/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-sm leading-tight mb-2">{doc.title}</h3>
          <div className={`inline-flex px-2 py-1 rounded-full text-xs text-white ${getCategoryColor(doc.category)}`}>
            {doc.category}
          </div>
        </div>
        <FileText size={16} className="text-gray-400 ml-2" />
      </div>
      
      <p className="text-xs text-gray-400 line-clamp-2 mb-3">{doc.content}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <User size={12} />
          <span>{doc.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={12} />
          <span>{formatDate(doc.createdAt)}</span>
        </div>
      </div>
      
      {doc.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {doc.tags.slice(0, 3).map((tag: string, index: number) => (
            <span key={index} className="bg-border px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
          {doc.tags.length > 3 && (
            <span className="text-xs text-gray-400">+{doc.tags.length - 3}</span>
          )}
        </div>
      )}
    </div>
  )
}

function DocumentPreview({ doc, onClose }: { doc: any; onClose: () => void }) {
  if (!doc) return null

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Daily Briefs': 'border-blue-500 bg-blue-500/10',
      'Weekly Reports': 'border-green-500 bg-green-500/10',
      'Market Alerts': 'border-red-500 bg-red-500/10',
      'Health Reports': 'border-purple-500 bg-purple-500/10',
      'Business Intelligence': 'border-yellow-500 bg-yellow-500/10'
    }
    return colors[category as keyof typeof colors] || 'border-gray-500 bg-gray-500/10'
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold mb-2">{doc.title}</h1>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm border ${getCategoryColor(doc.category)}`}>
              {doc.category}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-border/30 rounded-lg">
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-400" />
            <div>
              <div className="text-xs text-gray-400">Author</div>
              <div className="text-sm">{doc.author}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <div>
              <div className="text-xs text-gray-400">Created</div>
              <div className="text-sm">{formatDate(doc.createdAt)}</div>
            </div>
          </div>
        </div>

        <div className="prose prose-sm prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">{doc.content}</p>
        </div>

        {doc.tags.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16} className="text-gray-400" />
              <span className="text-sm font-medium">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {doc.tags.map((tag: string, index: number) => (
                <span key={index} className="bg-border px-3 py-1 rounded-lg text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-2 border border-border hover:bg-border rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default function MemoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedDocument, setSelectedDocument] = useState<any>(null)

  const filteredDocuments = useMemo(() => {
    return mockDocuments.filter(doc => {
      const matchesSearch = searchQuery === '' || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All Categories' || doc.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const getCategoryStats = () => {
    const stats = categories.slice(1).map(category => ({
      name: category,
      count: mockDocuments.filter(doc => doc.category === category).length
    }))
    return stats
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Memory & Documents</h1>
        <p className="text-gray-400">Searchable collection of reports, briefs, and intelligence</p>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents, content, or tags..."
              className="w-full pl-10 pr-4 py-2 bg-border border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
          
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 bg-border border border-border rounded-lg focus:outline-none focus:border-accent min-w-[180px]"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-4 border-t border-border">
          {getCategoryStats().map(stat => (
            <div key={stat.name} className="text-center">
              <div className="text-lg font-semibold">{stat.count}</div>
              <div className="text-xs text-gray-400">{stat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        
        <div className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleDateString('en-AU', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map(doc => (
          <DocumentCard 
            key={doc.id} 
            doc={doc}
            onClick={() => setSelectedDocument(doc)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="card p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">No documents found</h3>
          <p className="text-gray-400">
            {searchQuery ? 
              `No documents match your search for "${searchQuery}"` : 
              'No documents match the selected filters'
            }
          </p>
        </div>
      )}

      {/* Document Preview Modal */}
      {selectedDocument && (
        <DocumentPreview 
          doc={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}
    </div>
  )
}