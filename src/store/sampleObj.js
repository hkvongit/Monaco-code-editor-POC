const state = {
  folders: [
    {
      folderName: "Deployments",
      allowedFileTypes: ["json"],
      files: [
        {
          fileName: "sample.json",
          content: `{"sampleCode": "any sample code"}`
        },
        {
          fileName: "NewDeployment.json",
          content: `{"sampleCode": "any sample code"}`
        }
      ]
    },
    {
      folderName: "Scripts",
      allowedFileTypes: ["sh"],
      files: [
        {
          fileName: "sample.sh",
          content: `{"sampleCode": "any sample code"}`
        },
        {
          fileName: "NewDeployment.sh",
          content: `{"sampleCode": "any sample code"}`
        }
      ]
    }
  ],
  activeFile: "Deployments/sample.json"
}