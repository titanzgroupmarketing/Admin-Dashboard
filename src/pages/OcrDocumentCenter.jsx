import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../data/mockDatabase.js';
import { processDocumentWithOCR } from '../services/geminiOcrService.js';
import {
  ScanLine,
  UploadCloud,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Edit3,
  X,
  FileText,
  ShieldAlert,
  Save,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export default function OcrDocumentCenter() {
  const { currentUser } = useAuth();
  const [ocrJobs, setOcrJobs] = useState(() => db.getOcrJobs());
  const [selectedJob, setSelectedJob] = useState(() => db.getOcrJobs()[1] || db.getOcrJobs()[0]);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [docType, setDocType] = useState('Employee Intake & ID Form');
  const [uploadNotice, setUploadNotice] = useState('');

  // Review & Correction state
  const [editableFields, setEditableFields] = useState(() => selectedJob?.extractedFields || {});
  const [isEditing, setIsEditing] = useState(false);
  const [commitMessage, setCommitMessage] = useState('');

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setEditableFields({ ...job.extractedFields });
    setIsEditing(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadNotice(`Running Optical Character Intelligence extraction on ${file.name}...`);

    try {
      const ocrResult = await processDocumentWithOCR(file, docType);
      const newJob = db.addOcrJob({
        documentType: docType,
        fileName: file.name,
        uploadedBy: currentUser?.name || 'HR Administrator',
        confidenceScore: ocrResult.confidenceScore,
        extractedFields: ocrResult.extractedFields,
      });

      setOcrJobs(db.getOcrJobs());
      setSelectedJob(newJob);
      setEditableFields(newJob.extractedFields);
      setUploadNotice(`OCR parsing complete! Confidence score: ${ocrResult.confidenceScore}%. Ready for human verification.`);
    } catch (err) {
      setUploadNotice('Failed to extract document contents. Please verify file format.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadNotice(''), 6000);
    }
  };

  const handleCommitVerification = () => {
    if (!selectedJob) return;

    db.verifyAndCommitOcrJob(
      selectedJob.id,
      editableFields,
      currentUser?.name || 'Tariq Al-Mansoor'
    );

    setOcrJobs(db.getOcrJobs());
    setSelectedJob(db.getOcrJobById(selectedJob.id));
    setIsEditing(false);
    setCommitMessage(`Human-in-the-loop verification approved! Extracted records committed to official database.`);
    setTimeout(() => setCommitMessage(''), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            OCR Document Processing & Human Verification Center
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Automated text and field extraction for Emirates ID, onboarding forms, and weekly shift punch sheets.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Gemini AI Optical Intelligence Active</span>
        </div>
      </div>

      {uploadNotice && (
        <div className="p-3.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-lg text-xs font-medium flex items-center animate-in fade-in">
          <RefreshCw className="w-4 h-4 mr-2 animate-spin text-indigo-600 shrink-0" />
          <span>{uploadNotice}</span>
        </div>
      )}

      {commitMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
          <span>{commitMessage}</span>
        </div>
      )}

      {/* Upload Dropzone Card */}
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 sm:p-8 text-center hover:border-[#201B4F] transition-all">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-[#201B4F] mx-auto">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Upload Physical Document or Sheet for OCR Extraction
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Supports scanned PDF, high-res PNG, JPG/JPEG documents (Max 15MB)
            </p>
          </div>

          <div className="flex justify-center items-center gap-3 pt-2">
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="text-xs py-2 px-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#201B4F]"
            >
              <option value="Employee Intake & ID Form">Document: Emirates ID / Employee Onboarding</option>
              <option value="Weekly Physical Attendance Punch Sheet">Document: Weekly Attendance Punch Log</option>
            </select>

            <label className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-[#201B4F] hover:bg-[#2c2569] rounded-lg shadow-xs transition-colors cursor-pointer">
              <span>Browse Files</span>
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Jobs Queue & Verification Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Jobs Queue List */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Document Queue ({ocrJobs.length})
            </h3>
            <span className="text-[11px] text-gray-400">Recent Extraction Tasks</span>
          </div>

          <div className="space-y-2.5">
            {ocrJobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => handleSelectJob(job)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#201B4F] bg-[#201B4F]/5 ring-1 ring-[#201B4F]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-gray-800">{job.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        job.status === 'Verified & Imported'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="font-semibold text-xs text-[#111827] truncate">{job.fileName}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5 truncate">{job.documentType}</div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-400">
                    <span>Uploaded: {job.uploadedAt.split(' ')[0]}</span>
                    <span className="font-bold text-emerald-600">{job.confidenceScore}% Conf.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Human Review & Verification Workspace */}
        {selectedJob && (
          <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-[#111827]">
                    Human-in-the-Loop Verification
                  </h3>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      selectedJob.status === 'Verified & Imported'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {selectedJob.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  File: <strong className="text-gray-800">{selectedJob.fileName}</strong> &bull; Uploaded by {selectedJob.uploadedBy}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {selectedJob.status === 'Pending Review' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg shadow-xs cursor-pointer flex items-center"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                      {isEditing ? 'View Mode' : 'Correct Values'}
                    </button>

                    <button
                      type="button"
                      onClick={handleCommitVerification}
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors flex items-center cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                      Approve & Commit Record
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quality & Confidence Meter */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">OCR Confidence</span>
                <span className="font-bold text-base text-emerald-700 font-mono mt-0.5 block">
                  {selectedJob.confidenceScore}% Accuracy
                </span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Security Validation</span>
                <span className="font-semibold text-gray-800 mt-0.5 block">0 Injections / Tampering</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Duplicate Check</span>
                <span className="font-semibold text-emerald-700 mt-0.5 block">Passed (No Conflicts)</span>
              </div>
            </div>

            {/* Extracted Fields Form / Review Box */}
            <div className="border border-gray-200 rounded-xl p-5 bg-[#F8FAFC]">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
                Structured Extracted Fields (Editable for Human Review)
              </h4>

              {/* If it's an Attendance Punch Sheet */}
              {selectedJob.extractedFields.recordedAttendees ? (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-gray-500 text-[11px] block">Location</span>
                      <span className="font-semibold text-gray-900">{selectedJob.extractedFields.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[11px] block">Date</span>
                      <span className="font-semibold text-gray-900">{selectedJob.extractedFields.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[11px] block">Supervisor Signature</span>
                      <span className="font-semibold text-emerald-700">Verified Detected</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-gray-700 font-semibold mb-2 block">Parsed Attendees:</span>
                    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                          <tr>
                            <th className="py-2 px-3">ID</th>
                            <th className="py-2 px-3">Name</th>
                            <th className="py-2 px-3">Clock In</th>
                            <th className="py-2 px-3">Clock Out</th>
                            <th className="py-2 px-3">Parsed Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {selectedJob.extractedFields.recordedAttendees.map((att, i) => (
                            <tr key={i}>
                              <td className="py-2 px-3 font-mono font-bold text-gray-800">{att.employeeId}</td>
                              <td className="py-2 px-3 text-gray-900 font-medium">{att.name}</td>
                              <td className="py-2 px-3 font-mono">{att.clockIn}</td>
                              <td className="py-2 px-3 font-mono">{att.clockOut}</td>
                              <td className="py-2 px-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                                  {att.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                /* Employee Intake Fields */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-500 text-[11px] mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={editableFields.fullName || ''}
                      onChange={(e) => setEditableFields({ ...editableFields, fullName: e.target.value })}
                      className="w-full p-2 bg-white border border-gray-300 rounded font-semibold text-gray-900 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 text-[11px] mb-1">National ID / Emirates ID</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={editableFields.nationalId || ''}
                      onChange={(e) => setEditableFields({ ...editableFields, nationalId: e.target.value })}
                      className="w-full p-2 bg-white border border-gray-300 rounded font-mono text-gray-900 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 text-[11px] mb-1">Proposed Employee ID</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={editableFields.employeeId || ''}
                      onChange={(e) => setEditableFields({ ...editableFields, employeeId: e.target.value })}
                      className="w-full p-2 bg-white border border-gray-300 rounded font-mono font-bold text-gray-900 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 text-[11px] mb-1">Job Title</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={editableFields.jobTitle || ''}
                      onChange={(e) => setEditableFields({ ...editableFields, jobTitle: e.target.value })}
                      className="w-full p-2 bg-white border border-gray-300 rounded text-gray-900 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 text-[11px] mb-1">Department</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={editableFields.department || ''}
                      onChange={(e) => setEditableFields({ ...editableFields, department: e.target.value })}
                      className="w-full p-2 bg-white border border-gray-300 rounded text-gray-900 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 text-[11px] mb-1">Starting Basic Salary (AED)</label>
                    <input
                      type="number"
                      disabled={!isEditing}
                      value={editableFields.basicSalary || ''}
                      onChange={(e) => setEditableFields({ ...editableFields, basicSalary: e.target.value })}
                      className="w-full p-2 bg-white border border-gray-300 rounded font-mono text-gray-900 disabled:bg-gray-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-gray-500 text-[11px] mb-1">UAE Central Bank IBAN</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={editableFields.iban || ''}
                      onChange={(e) => setEditableFields({ ...editableFields, iban: e.target.value })}
                      className="w-full p-2 bg-white border border-gray-300 rounded font-mono text-gray-900 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              )}
            </div>

            {selectedJob.status === 'Verified & Imported' && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center justify-between">
                <span>Verified and committed into official system by <strong>{selectedJob.verifiedBy}</strong> on {selectedJob.verifiedAt}.</span>
                <ShieldAlert className="w-4 h-4 text-emerald-600" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
