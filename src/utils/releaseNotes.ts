export interface ReleaseNote {
  version: string
  isMostRecent: boolean
  title: string
  image: string
  content: string
  learnMore: string
}

const releaseNotes: Array<ReleaseNote> = [
  {
    version: '1.9.0',
    isMostRecent: true,
    title: 'UI Color Palette 19 update highlight',
    image:
      'data:image/webp;base64,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',
    content:
      'Automatically identify the closest color shade to the source color when editing a palette. This feature aims to obtain the sRGB version of the source color that may not be natively within the gamut, making it easier to use in your UI.',
    learnMore: 'https://uicp.link/whats-new',
  },
]

export default releaseNotes
