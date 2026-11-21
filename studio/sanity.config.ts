import {defineConfig} from 'sanity'
import {structureTool, type StructureBuilder} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singleton = (S: StructureBuilder, schemaType: string, documentId: string, title: string) =>
  S.listItem().title(title).child(S.document().schemaType(schemaType).documentId(documentId))

export default defineConfig({
  name: 'default',
  title: 'PrinceHouseFilms',

  projectId: 'zsbii2ih',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Website Content')
              .child(
                S.list()
                  .title('Website Content')
                  .items([
                    singleton(S, 'hero', 'hero-singleton', 'Hero'),
                    singleton(S, 'about', 'about', 'About'),
                    S.listItem()
                      .title('Services')
                      .child(
                        S.list()
                          .title('Services')
                          .items([
                            singleton(S, 'servicesSection', 'servicesSection', 'Section Heading'),
                            S.documentTypeListItem('service').title('Services'),
                          ]),
                      ),
                    S.listItem()
                      .title('Partnership')
                      .child(
                        S.list()
                          .title('Partnership')
                          .items([
                            singleton(
                              S,
                              'partnershipSection',
                              'partnershipSection',
                              'Section Heading',
                            ),
                            S.documentTypeListItem('partner').title('Partner Logos'),
                          ]),
                      ),
                    S.listItem()
                      .title('Team')
                      .child(
                        S.list()
                          .title('Team')
                          .items([
                            singleton(S, 'teamSection', 'teamSection', 'Section Heading'),
                            S.documentTypeListItem('teamMember').title('Team Members'),
                          ]),
                      ),
                    singleton(S, 'getInTouch', 'getInTouch', 'Contact'),
                    singleton(S, 'header', 'header', 'Header'),
                    singleton(S, 'footer', 'footer', 'Footer'),
                  ]),
              ),

            S.divider(),

            S.listItem()
              .title('Legal')
              .child(
                S.list()
                  .title('Legal')
                  .items([singleton(S, 'privacyPolicy', 'privacyPolicy', 'Privacy Policy')]),
              ),

            S.listItem()
              .title('Site Configuration')
              .child(
                S.list()
                  .title('Site Configuration')
                  .items([
                    singleton(S, 'siteSettings', 'siteSettings', 'Site Settings'),
                    singleton(S, 'preloader', 'preloader', 'Preloader'),
                    singleton(S, 'errorBoundary', 'errorBoundary', 'Error Boundary'),
                    S.documentTypeListItem('contactDetail').title('Contact Details'),
                  ]),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
