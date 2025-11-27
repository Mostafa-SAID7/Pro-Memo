/**
 * Export/Import Controller
 */

const exportService = require('../../../core/services/export/exportService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

exports.exportProjectsCSV = asyncHandler(async (req, res) => {
  const csv = await exportService.exportProjectsToCSV(req.user.id);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=projects.csv');
  res.send(csv);
});

exports.exportTasksCSV = asyncHandler(async (req, res) => {
  const { projectId } = req.query;
  const csv = await exportService.exportTasksToCSV(req.user.id, projectId);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=tasks.csv');
  res.send(csv);
});

exports.exportProjectsExcel = asyncHandler(async (req, res) => {
  const workbook = await exportService.exportProjectsToExcel(req.user.id);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=projects.xlsx');
  await workbook.xlsx.write(res);
  res.end();
});

exports.exportTasksExcel = asyncHandler(async (req, res) => {
  const { projectId } = req.query;
  const workbook = await exportService.exportTasksToExcel(req.user.id, projectId);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=tasks.xlsx');
  await workbook.xlsx.write(res);
  res.end();
});

exports.exportJSON = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const json = await exportService.exportToJSON(req.user.id, type);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=export.json');
  res.send(json);
});

exports.importTasksCSV = asyncHandler(async (req, res) => {
  const { projectId } = req.body;
  const csvData = req.file ? req.file.buffer.toString() : req.body.csvData;
  const result = await exportService.importTasksFromCSV(csvData, projectId, req.user.id);
  successResponse(res, result, `Imported ${result.success} tasks successfully`);
});
