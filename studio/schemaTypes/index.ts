// studio/schemaTypes/index.ts
//
// Schema registry. Only types that back the current website are registered:
// Hero, About, Services, Partnership, Team, Contact, Header, Footer, the
// Privacy Policy route, and the shared configuration and object types they
// depend on.

import {heroType} from './heroType'
import {serviceType} from './serviceType'
import {mediaItemType} from './mediaItemType'
import {siteSettingsType} from './siteSettingsType'
import {headerType} from './headerType'
import {preloaderType} from './preloaderType'
import {aboutType} from './aboutType'
import {servicesSectionType} from './servicesSectionType'
import {teamSectionType} from './teamSectionType'
import {partnershipSectionType} from './partnershipSectionType'
import {getInTouchType} from './getInTouchType'
import {footerType} from './footerType'
import {privacyPolicyType} from './privacyPolicyType'
import {errorBoundaryType} from './errorBoundaryType'
import {teamMemberType} from './teamMemberType'
import {partnerType} from './partnerType'
import {contactDetailType} from './contactDetailType'
import {socialLinkType} from './socialLinkType'

export const schemaTypes = [
  // Section singletons
  heroType,
  aboutType,
  servicesSectionType,
  partnershipSectionType,
  teamSectionType,
  getInTouchType,
  headerType,
  footerType,
  preloaderType,
  privacyPolicyType,
  errorBoundaryType,
  siteSettingsType,

  // Collections
  serviceType,
  partnerType,
  teamMemberType,
  contactDetailType,

  // Reusable objects
  mediaItemType,
  socialLinkType,
]
