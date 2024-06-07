import moment from "moment";
// import fileType from "file-type";

const fileTypes = {
  image: [
    { extension: "jpeg", mimeType: "image/jpeg" },
    { extension: "jpg", mimeType: "image/jpeg" },
    { extension: "png", mimeType: "image/png" },
    { extension: "gif", mimeType: "image/gif" },
    { extension: "bmp", mimeType: "image/bmp" },
  ],
  document: [
    { extension: "pdf", mimeType: "application/pdf" },
    { extension: "doc", mimeType: "application/msword" },
    {
      extension: "docx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    { extension: "txt", mimeType: "text/plain" },
  ],
  spreadsheet: [
    { extension: "xls", mimeType: "application/vnd.ms-excel" },
    {
      extension: "xlsx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    { extension: "csv", mimeType: "text/csv" },
  ],
  audio: [
    { extension: "mp3", mimeType: "audio/mpeg" },
    { extension: "wav", mimeType: "audio/wav" },
    { extension: "ogg", mimeType: "audio/ogg" },
  ],
  video: [
    { extension: "mp4", mimeType: "video/mp4" },
    { extension: "avi", mimeType: "video/x-msvideo" },
    { extension: "mkv", mimeType: "video/x-matroska" },
  ],
};

export const commonService = {
  calculateDaysAndNights: (startDate, endDate) => {
    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);

      const days = end.diff(start, "days");
      const nights = days - 1;

      return { days, nights };
    }
  },

  calculateEndDate: (startDate, days, nights) => {
    const start = moment(startDate);
    const end = start.clone().add(days, "days").add(nights, "days");

    return end.format("YYYY-MM-DD");
  },

  calculateNightsAndEndDate: (startDate, days) => {
    const start = moment(startDate);
    const end = start.clone().add(days, "days");
    const nights = days - 1;
    const endDate = end.subtract(nights, "days").format("YYYY-MM-DD");

    return { nights, endDate };
  },

  calculateDaysAndEndDate: (startDate, nights) => {
    const start = moment(startDate);
    const end = start.clone().add(nights, "days");
    const days = nights + 1;
    const endDate = end.subtract(1, "days").format("YYYY-MM-DD");

    return { days, endDate };
  },

  validateFile: (value) => {
    // Perform file validation logic
    const file = value[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      return true; // File is not required, so no validation needed
    }

    if (!allowedTypes.includes(file.type)) {
      return "Invalid file type. Please upload a JPEG or PNG image.";
    }

    if (file.size > maxFileSize) {
      return "File size exceeds the maximum limit of 5MB.";
    }

    /// return true; // Return true for valid file
  },
  getCurrentTimeFileName: () => {
    var currentDate = new Date();
    var currentTime = currentDate.toISOString().replace(/[-:.T]/g, "");
    var fileName = currentTime + ".txt";
    return fileName;
  },
};
