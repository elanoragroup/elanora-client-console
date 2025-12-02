'use client'

import React, { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import ProgressBar from '@/components/ui/ProgressBar'
import { motion } from 'framer-motion'
import { safeFormatDate } from '@/lib/date-utils'
import {
  FolderKanban,
  Calendar,
  User,
  Clock,
  FileText,
  MessageSquare,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  progress: number
  assignedPerson: string
  startDate: string
  endDate: string
  status: 'On Track' | 'At Risk' | 'Completed'
  milestones: { name: string; completed: boolean; date: string }[]
  documentsCount: number
  notesCount: number
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showProjectModal, setShowProjectModal] = useState(false)

  const projects: Project[] = [
    {
      id: '1',
      name: 'Annual Audit FY 2024-25',
      description: 'Statutory audit for financial year 2024-25',
      progress: 45,
      assignedPerson: 'Rajesh Kumar',
      startDate: '2024-04-01',
      endDate: '2024-09-30',
      status: 'On Track',
      milestones: [
        { name: 'Preliminary audit', completed: true, date: '2024-05-15' },
        { name: 'Inventory verification', completed: true, date: '2024-06-30' },
        { name: 'Final audit', completed: false, date: '2024-09-15' },
        { name: 'Report submission', completed: false, date: '2024-09-30' },
      ],
      documentsCount: 24,
      notesCount: 8,
    },
    {
      id: '2',
      name: 'GST Audit FY 2023-24',
      description: 'GST audit and compliance verification',
      progress: 75,
      assignedPerson: 'Priya Sharma',
      startDate: '2024-08-01',
      endDate: '2024-10-31',
      status: 'On Track',
      milestones: [
        { name: 'Data collection', completed: true, date: '2024-08-15' },
        { name: 'Reconciliation', completed: true, date: '2024-09-15' },
        { name: 'Draft report', completed: true, date: '2024-10-10' },
        { name: 'Final submission', completed: false, date: '2024-10-31' },
      ],
      documentsCount: 18,
      notesCount: 5,
    },
    {
      id: '3',
      name: 'Business Restructuring Advisory',
      description: 'Strategic advisory for business restructuring',
      progress: 30,
      assignedPerson: 'Amit Patel',
      startDate: '2024-09-01',
      endDate: '2025-01-31',
      status: 'At Risk',
      milestones: [
        { name: 'Initial assessment', completed: true, date: '2024-09-15' },
        { name: 'Financial analysis', completed: false, date: '2024-10-30' },
        { name: 'Strategy formulation', completed: false, date: '2024-12-15' },
        { name: 'Implementation plan', completed: false, date: '2025-01-31' },
      ],
      documentsCount: 12,
      notesCount: 15,
    },
  ]

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setShowProjectModal(true)
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <FolderKanban className="w-8 h-8 text-primary" />
                Projects & Engagements
              </h1>
              <p className="text-gray-600">
                Track your ongoing projects and engagements
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card hover>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FolderKanban className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                <p className="text-xs font-medium text-gray-600">Active Projects</p>
              </div>
            </div>
          </Card>
          <Card hover>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
                </p>
                <p className="text-xs font-medium text-gray-600">Avg. Progress</p>
              </div>
            </div>
          </Card>
          <Card hover>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.filter(p => p.status === 'At Risk').length}
                </p>
                <p className="text-xs font-medium text-gray-600">Projects At Risk</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div className="cursor-pointer" onClick={() => handleProjectClick(project)}>
                <Card hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    <Badge
                      variant={
                        project.status === 'On Track'
                          ? 'success'
                          : project.status === 'At Risk'
                          ? 'warning'
                          : 'neutral'
                      }
                      dot
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {project.progress}%
                    </span>
                  </div>
                  <ProgressBar
                    value={project.progress}
                    color={
                      project.status === 'On Track'
                        ? 'success'
                        : project.status === 'At Risk'
                        ? 'warning'
                        : 'primary'
                    }
                  />
                </div>

                {/* Timeline & Assigned Person */}
                <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{project.assignedPerson}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {safeFormatDate(project.endDate)}
                    </span>
                  </div>
                </div>

                {/* Milestones */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-3">Milestones</p>
                  <div className="flex items-center gap-2">
                    {project.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 h-1.5 rounded-full ${
                          milestone.completed ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                        title={milestone.name}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {project.milestones.filter(m => m.completed).length} of{' '}
                    {project.milestones.length} completed
                  </p>
                </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <Modal
          isOpen={showProjectModal}
          onClose={() => setShowProjectModal(false)}
          title="Project Details"
          size="lg"
        >
          {selectedProject && (
            <div className="p-6 space-y-6">
              {/* Project Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedProject.name}
                </h3>
                <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      selectedProject.status === 'On Track'
                        ? 'success'
                        : selectedProject.status === 'At Risk'
                        ? 'warning'
                        : 'neutral'
                    }
                    dot
                  >
                    {selectedProject.status}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {safeFormatDate(selectedProject.startDate)} -{' '}
                    {safeFormatDate(selectedProject.endDate)}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Progress</h4>
                <ProgressBar value={selectedProject.progress} showLabel />
              </div>

              {/* Milestones */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Timeline</h4>
                <div className="space-y-3">
                  {selectedProject.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          milestone.completed
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      >
                        {milestone.completed && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          milestone.completed ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {milestone.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {safeFormatDate(milestone.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedProject.documentsCount}
                  </p>
                  <p className="text-xs text-gray-600">Documents</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedProject.notesCount}
                  </p>
                  <p className="text-xs text-gray-600">Notes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedProject.milestones.filter(m => m.completed).length}
                  </p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="primary"
                  icon={<MessageSquare className="w-4 h-4" />}
                  className="flex-1"
                >
                  Message Assigned CA
                </Button>
                <Button
                  variant="outline"
                  icon={<FileText className="w-4 h-4" />}
                  className="flex-1"
                >
                  View Documents
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
  )
}

