'use client';

/**
 * Export/Import Menu Component
 */

import { useState } from 'react';
import { Download01Icon, Upload01Icon } from 'hugeicons-react';
import { Button } from './Button';
import { Modal } from './Modal';
import { exportApi } from '@/lib/exportApi';

interface ExportImportMenuProps {
  type: 'projects' | 'tasks';
  projectId?: string;
}

export function ExportImportMenu({ type, projectId }: ExportImportMenuProps) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleExport = async (format: 'csv' | 'excel' | 'json') => {
    try {
      let blob: Blob;
      let filename: string;

      if (type === 'projects') {
        if (format === 'csv') {
          blob = await exportApi.exportProjectsCSV();
          filename = 'projects.csv';
        } else if (format === 'excel') {
          blob = await exportApi.exportProjectsExcel();
          filename = 'projects.xlsx';
        } else {
          blob = await exportApi.exportJSON('projects');
          filename = 'projects.json';
        }
      } else {
        if (format === 'csv') {
          blob = await exportApi.exportTasksCSV(projectId);
          filename = 'tasks.csv';
        } else if (format === 'excel') {
          blob = await exportApi.exportTasksExcel(projectId);
          filename = 'tasks.xlsx';
        } else {
          blob = await exportApi.exportJSON('tasks');
          filename = 'tasks.json';
        }
      }

      exportApi.downloadBlob(blob, filename);
      setShowExportModal(false);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const handleImport = async () => {
    if (!selectedFile || !projectId) return;

    try {
      setImporting(true);
      const result = await exportApi.importTasksCSV(projectId, selectedFile);
      alert(`Successfully imported ${result.success} tasks`);
      setShowImportModal(false);
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      console.error('Import failed:', error);
      alert('Import failed. Please check your file format.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={() => setShowExportModal(true)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download01Icon className="w-4 h-4" />
          Export
        </Button>
        {type === 'tasks' && projectId && (
          <Button
            onClick={() => setShowImportModal(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Upload01Icon className="w-4 h-4" />
            Import
          </Button>
        )}
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title={`Export ${type}`}
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Choose a format to export your {type}:
          </p>
          <div className="space-y-2">
            <Button
              onClick={() => handleExport('csv')}
              variant="outline"
              className="w-full justify-start"
            >
              CSV Format (.csv)
            </Button>
            <Button
              onClick={() => handleExport('excel')}
              variant="outline"
              className="w-full justify-start"
            >
              Excel Format (.xlsx)
            </Button>
            <Button
              onClick={() => handleExport('json')}
              variant="outline"
              className="w-full justify-start"
            >
              JSON Format (.json)
            </Button>
          </div>
        </div>
      </Modal>

      {/* Import Modal */}
      <Modal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Import Tasks"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Upload a CSV file to import tasks into this project:
          </p>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-primary-600 hover:text-primary-700"
            >
              {selectedFile ? selectedFile.name : 'Click to select a CSV file'}
            </label>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleImport}
              disabled={!selectedFile || importing}
              className="flex-1"
            >
              {importing ? 'Importing...' : 'Import'}
            </Button>
            <Button
              onClick={() => {
                setShowImportModal(false);
                setSelectedFile(null);
              }}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
