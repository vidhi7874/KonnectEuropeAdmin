export const exportData = {
  convertToCSV: (data, columns) => {
    const headers = columns.map((column) => column.name);
    const csvRows = [];

    // Add header row
    csvRows.push(headers.join(","));

    // Add data rows
    data.forEach((item) => {
      const values = columns.map((column) => item[column.selector]);
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  },
};
