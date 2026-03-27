export type ComponentType = {
    id: string
    type: string
    props: any
  }
  
  export type Template = {
    templateId: string
    name: string
    components: ComponentType[]
  }
  
  export type TemplateCategory = {
    category: string
    templates: Template[]
  }