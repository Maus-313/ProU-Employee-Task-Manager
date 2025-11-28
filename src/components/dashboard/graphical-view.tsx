'use client'

import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'

interface ProjectCount {
  projectName: string | null
  taskCount: number
}

interface GraphicalViewProps {
  projectCounts: ProjectCount[]
  onClose: () => void
}

export function GraphicalView({ projectCounts, onClose }: GraphicalViewProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={windowRef}
      className="fixed z-50 bg-white rounded-lg shadow-lg border max-w-4xl w-full"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div
        className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <h3 className="text-lg font-semibold">Project Task Overview</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {projectCounts.map((project, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-blue-50 border border-blue-200 rounded-lg p-4 min-w-[200px] text-center"
            >
              <h4 className="font-medium text-blue-900 mb-2">
                {project.projectName || 'Unnamed Project'}
              </h4>
              <div className="text-2xl font-bold text-blue-600">
                {project.taskCount}
              </div>
              <div className="text-sm text-blue-700">Tasks</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}