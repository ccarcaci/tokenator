"use strict"

describe("Build message header object", () => {
  test("Got MSH message", () => {
    const segment = "MSH|^~\\&|IM_AIP_HL7^IM$1.0|AIP_HL7_location|||20200127000000||ORU^R01|request-id|P|2.6|1||AL|NE|"
    const msh = parseMsh(segment)

    expect(msh).toEqual({
      separators: {
        fieldsSeparator: "|",
        componentSeparator: "^",
        fieldRepeatSeparator: "~",
        escapeCharacter: "\\",
        subComponentSeparator: "&"
      },
      fields: [
        {
          key: "MSH-1",
          value: "|"
        },
        {
          key: "MSH-2",
          value: "^~\\&"
        },
        {
          key: "MSH-3.1",
          value: "IM_AIP_HL7"
        },
        {
          key: "MSH-3.2",
          value: "IM$1.0"
        },
        {
          key: "MSH-4",
          value: "AIP_HL7_location"
        },
        {
          key: "MSH-5",
          value: ""
        },
        {
          key: "MSH-6",
          value: ""
        },
        {
          key: "MSH-7",
          value: "20200127000000"
        },
        {
          key: "MSH-8",
          value: ""
        },
        {
          key: "MSH-9.1",
          value: "ORU"
        },
        {
          key: "MSH-9.2",
          value: "R01"
        },
        {
          key: "MSH-10",
          value: "request-id"
        },
        {
          key: "MSH-11",
          value: "P"
        },
        {
          key: "MSH-12",
          value: "2.6"
        },
        {
          key: "MSH-13",
          value: "1"
        },
        {
          key: "MSH-14",
          value: ""
        },
        {
          key: "MSH-15",
          value: "AL"
        },
        {
          key: "MSH-16",
          value: "NE"
        },
      ]
    })
  })
})
