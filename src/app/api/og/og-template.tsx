import {
  ambientGradients,
  borderStyles,
  containerStyles,
  contentStyles,
  descriptionStyles,
  domainStyles,
  headerStyles,
  logoStyles,
  titleStyles,
} from "./og-styles"

interface OGTemplateProps {
  title: string
  description?: string
  fontFamily: string
}

export function OGTemplate({
  title,
  description,
  fontFamily,
}: OGTemplateProps) {
  return (
    <div style={{ ...containerStyles, fontFamily }}>
      <div style={ambientGradients.top} />
      <div style={ambientGradients.bottom} />

      <div style={borderStyles}>
        <div style={headerStyles}>
          <div style={logoStyles.container}>
            <div style={logoStyles.monolith}>
              <div style={logoStyles.bar1} />
              <div style={logoStyles.bar2} />
              <div style={logoStyles.bar3} />
            </div>
            <span style={logoStyles.text}>Coscientist</span>
          </div>
          <span style={domainStyles}>coscientist.app</span>
        </div>

        <div style={contentStyles}>
          <h1 style={titleStyles}>{title}</h1>
          {description && (
            <p style={descriptionStyles}>
              {description.length > 140
                ? `${description.slice(0, 140)}...`
                : description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
