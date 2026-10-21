import { Extension } from "@tiptap/core"
import { getSelectedNodesOfType } from "@/lib/tiptap-utils"
import { updateNodesAttr } from "@/lib/tiptap-utils"

const DEFAULT_ATTRIBUTE_NAME = "backgroundColor"

/**
 * The attribute the editor's NodeBackground extension writes, for UI that
 * reads the color back. Returns the default when the extension is missing.
 */
export function getNodeBackgroundAttributeName(editor) {
  const attributeName = editor?.extensionManager.extensions.find(
    (extension) => extension.name === "nodeBackground"
  )?.options.attributeName

  return typeof attributeName === "string"
    ? attributeName
    : DEFAULT_ATTRIBUTE_NAME
}

/**
 * Determines the target color for toggle operations
 */
function getToggleColor(targets, attributeName, inputColor) {
  if (targets.length === 0) return null

  for (const target of targets) {
    const currentColor = target.node.attrs?.[attributeName] ?? null
    if (currentColor !== inputColor) {
      return inputColor
    }
  }

  return null
}

export const NodeBackground = Extension.create({
  name: "nodeBackground",

  addOptions() {
    return {
      types: [
        "paragraph",
        "heading",
        "blockquote",
        "taskList",
        "bulletList",
        "orderedList",
        "tableCell",
        "tableHeader",
      ],
      useStyle: true,
      attributeName: DEFAULT_ATTRIBUTE_NAME,
    }
  },

  addGlobalAttributes() {
    const { attributeName } = this.options

    return [
      {
        types: this.options.types,
        attributes: {
          [attributeName]: {
            default: null,

            parseHTML: (element) => {
              const styleColor = element.style?.backgroundColor
              if (styleColor) return styleColor

              const dataColor = element.getAttribute("data-background-color")
              return dataColor || null
            },

            renderHTML: (attributes) => {
              const color = attributes[attributeName]
              if (!color) return {}

              if (this.options.useStyle) {
                return {
                  style: `background-color: ${color}`,
                }
              } else {
                return {
                  "data-background-color": color,
                }
              }
            },
          },
        },
      },
    ];
  },

  addCommands() {
    /**
     * Generic command executor for background color operations
     */
    const executeBackgroundCommand = (
      getTargetColor
    ) => {
      return (inputColor) =>
        ({
          state,
          tr
        }) => {
          const targets = getSelectedNodesOfType(
            state.selection,
            this.options.types
          )

          if (targets.length === 0) return false

          const targetColor = getTargetColor(targets, inputColor)

          return updateNodesAttr(
            tr,
            targets,
            this.options.attributeName,
            targetColor
          )
        };
    }

    return {
      /**
       * Set background color to specific value
       */
      setNodeBackgroundColor: executeBackgroundCommand(
        (_, inputColor) => inputColor || null
      ),

      /**
       * Remove background color
       */
      unsetNodeBackgroundColor: executeBackgroundCommand(() => null),

      /**
       * Toggle background color (set if different/missing, unset if all have it)
       */
      toggleNodeBackgroundColor: executeBackgroundCommand(
        (targets, inputColor) =>
          getToggleColor(targets, this.options.attributeName, inputColor || "")
      ),
    }
  },
})
