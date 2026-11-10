import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

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
            S.listItem().title('Page Sections').child(
              S.list().title('Page Sections').items([
                S.listItem().title('Site Settings').child(
                  S.document().schemaType('siteSettings').documentId('siteSettings'),
                ),
                S.listItem().title('Header').child(
                  S.document().schemaType('header').documentId('header'),
                ),
                S.listItem().title('Preloader').child(
                  S.document().schemaType('preloader').documentId('preloader'),
                ),
                S.listItem().title('Hero').child(
                  S.document().schemaType('hero').documentId('hero-singleton'),
                ),
                S.listItem().title('About').child(
                  S.document().schemaType('about').documentId('about'),
                ),
                S.listItem().title('Our Creative Process (Approach)').child(
                  S.document().schemaType('approach').documentId('approach'),
                ),
                S.listItem().title('Our Vision & Mission (Objectives)').child(
                  S.document().schemaType('objectives').documentId('objectives'),
                ),
                S.listItem().title('Our Impact in Numbers (Counts)').child(
                  S.document().schemaType('counts').documentId('counts'),
                ),
                S.listItem().title('Why Choose Us').child(
                  S.document().schemaType('whyUs').documentId('whyUs'),
                ),
                S.listItem().title('Services Section').child(
                  S.document().schemaType('servicesSection').documentId('servicesSection'),
                ),
                S.listItem().title('Portfolio Section').child(
                  S.document().schemaType('portfolioSection').documentId('portfolioSection'),
                ),
                S.listItem().title('Gallery Section').child(
                  S.document().schemaType('gallerySection').documentId('gallerySection'),
                ),
                S.listItem().title('Team Section').child(
                  S.document().schemaType('teamSection').documentId('teamSection'),
                ),
                S.listItem().title('Partnership Section').child(
                  S.document().schemaType('partnershipSection').documentId('partnershipSection'),
                ),
                S.listItem().title('Get In Touch').child(
                  S.document().schemaType('getInTouch').documentId('getInTouch'),
                ),
                S.listItem().title('Footer').child(
                  S.document().schemaType('footer').documentId('footer'),
                ),
                S.listItem().title('Privacy Policy').child(
                  S.document().schemaType('privacyPolicy').documentId('privacyPolicy'),
                ),
                S.listItem().title('Error Boundary').child(
                  S.document().schemaType('errorBoundary').documentId('errorBoundary'),
                ),
              ])
            ),
            S.divider(),
            S.listItem().title('Collections').child(
              S.list().title('Collections').items([
                S.documentTypeListItem('service').title('Services'),
                S.documentTypeListItem('approachStep').title('Approach Steps'),
                S.documentTypeListItem('portfolioCategory').title('Portfolio Categories'),
                S.documentTypeListItem('portfolioItem').title('Portfolio Items'),
                S.documentTypeListItem('galleryCategory').title('Gallery Categories'),
                S.documentTypeListItem('galleryItem').title('Gallery Items'),
                S.documentTypeListItem('partner').title('Partner Logos'),
                S.documentTypeListItem('contactDetail').title('Contact Details'),
                // teamMember hidden per A8 — uncomment when content ready
                // S.documentTypeListItem('teamMember').title('Team Members'),
              ])
            ),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
