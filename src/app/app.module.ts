import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

// This is used sparingly throughout the app
import { OrderModule } from 'ngx-order-pipe'

import { DragDropModule } from '@angular/cdk/drag-drop'
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { ColorPickerModule } from 'ngx-color-picker';

import {
  faArrowCircleRight,
  faDollarSign,
  faEdit,
  faMapMarker,
  faCopy,
  faPlus,
  faShare,
  faTrash,
  faFire,
  faAngleLeft,
  faCog,
  faBars,
  faSortDown,
  faStar,
  faPencilAlt,
  faList,
  faCheck,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faBullhorn,
  faExclamationTriangle,
  faSort,
  faMinus,
  faCheckDouble,
  faTimes,
  faBackward,
  faForward,
  faCaretRight,
  faCaretLeft,
  faCaretUp,
  faCaretDown,
  faAngleUp,
  faAngleDown,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCircle,
  faCertificate,
  faMinusCircle,
  faSkull,
} from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faFacebookF,
  faRedditAlien,
  faTwitter,
  faGoogle,
  faAndroid,
  faApple,
  faWindows
} from '@fortawesome/free-brands-svg-icons';
import { Dnd5eSheetsComponent } from './pages/dnd5e-sheets/dnd5e-sheets.component';
import { TabsComponent } from './components/common/tabs/tabs.component';
import { LoadingComponent } from './components/common/loading/loading.component';
import { Dnd5eTabOverviewComponent } from './pages/dnd5e-sheets/tabs/overview/overview.component';
import { Dnd5eTabGeneralComponent } from './pages/dnd5e-sheets/tabs/general/general.component';
import { Dnd5eTabAbilitiesComponent } from './pages/dnd5e-sheets/tabs/abilities/abilities.component';
import { Dnd5eTabCombatComponent } from './pages/dnd5e-sheets/tabs/combat/combat.component';
import { Dnd5eTabEquipmentComponent } from './pages/dnd5e-sheets/tabs/equipment/equipment.component';
import { Dnd5eTabPowersComponent } from './pages/dnd5e-sheets/tabs/powers/powers.component';
import { Dnd5eTabItemsComponent } from './pages/dnd5e-sheets/tabs/items/items.component';
import { Dnd5eTabListsComponent } from './pages/dnd5e-sheets/tabs/lists/lists.component';
import { Dnd5eTabJournalComponent } from './pages/dnd5e-sheets/tabs/journal/journal.component';
import { Dnd5eTabSpellbookComponent } from './pages/dnd5e-sheets/tabs/spellbook/spellbook.component';
import { Dnd5eTabConditionsComponent } from './pages/dnd5e-sheets/tabs/conditions/conditions.component';
import { Dnd5eTabCompanionsComponent } from './pages/dnd5e-sheets/tabs/companions/companions.component';
import { Dnd5eTabBuilderComponent } from './pages/dnd5e-sheets/tabs/builder/builder.component';
import { Dnd5eTabDiceComponent } from './pages/dnd5e-sheets/tabs/dice/dice.component';
import { Dnd5eTabSettingsComponent } from './pages/dnd5e-sheets/tabs/settings/settings.component';
import { Dnd5eTabPrintComponent } from './pages/dnd5e-sheets/tabs/print/print.component';
import { Dnd5eTabSpellPickerComponent } from './pages/dnd5e-sheets/tabs/spell-picker/spell-picker.component';
import { TabUpgradeComponent } from './components/common/tab-upgrade/tab-upgrade.component';
import { HoldDeleteComponent } from './components/common/hold-delete/hold-delete.component';
import { Dnd5ePowerBarbarianComponent } from './pages/dnd5e-sheets/powers/barbarian/barbarian.component';
import { Dnd5ePowerBardComponent } from './pages/dnd5e-sheets/powers/bard/bard.component';
import { Dnd5ePowerClericComponent } from './pages/dnd5e-sheets/powers/cleric/cleric.component';
import { Dnd5ePowerDruidComponent } from './pages/dnd5e-sheets/powers/druid/druid.component';
import { Dnd5ePowerFighterComponent } from './pages/dnd5e-sheets/powers/fighter/fighter.component';
import { Dnd5ePowerMonkComponent } from './pages/dnd5e-sheets/powers/monk/monk.component';
import { Dnd5ePowerPaladinComponent } from './pages/dnd5e-sheets/powers/paladin/paladin.component';
import { Dnd5ePowerRangerComponent } from './pages/dnd5e-sheets/powers/ranger/ranger.component';
import { Dnd5ePowerRogueComponent } from './pages/dnd5e-sheets/powers/rogue/rogue.component';
import { Dnd5ePowerSorcererComponent } from './pages/dnd5e-sheets/powers/sorcerer/sorcerer.component';
import { Dnd5ePowerWarlockComponent } from './pages/dnd5e-sheets/powers/warlock/warlock.component';
import { Dnd5ePowerWizardComponent } from './pages/dnd5e-sheets/powers/wizard/wizard.component';
import { Dnd5eOverviewAttacksComponent } from './pages/dnd5e-sheets/overview/attacks/attacks.component';
import { Dnd5eOverviewVitalsComponent } from './pages/dnd5e-sheets/overview/vitals/vitals.component';
import { Dnd5eOverviewRestComponent } from './pages/dnd5e-sheets/overview/rest/rest.component';
import { Dnd5eOverviewWeightComponent } from './pages/dnd5e-sheets/overview/weight/weight.component';
import { Dnd5eOverviewAbilitiesComponent } from './pages/dnd5e-sheets/overview/abilities/abilities.component';
import { Dnd5eOverviewSkillsComponent } from './pages/dnd5e-sheets/overview/skills/skills.component';
import { Dnd5eOverviewConditionsComponent } from './pages/dnd5e-sheets/overview/conditions/conditions.component';
import { Dnd5eOverviewListsComponent } from './pages/dnd5e-sheets/overview/lists/lists.component';
import { Dnd5eOverviewCustomStatsComponent } from './pages/dnd5e-sheets/overview/custom-stats/custom-stats.component';
import { Dnd5eOverviewConsumablesComponent } from './pages/dnd5e-sheets/overview/consumables/consumables.component';
import { Dnd5eOverviewValuablesComponent } from './pages/dnd5e-sheets/overview/valuables/valuables.component';
import { Dnd5eOverviewFeatsComponent } from './pages/dnd5e-sheets/overview/feats/feats.component';
import { Dnd5eOverviewSpellsComponent } from './pages/dnd5e-sheets/overview/spells/spells.component';
import { Dnd5eOverviewCompanionsComponent } from './pages/dnd5e-sheets/overview/companions/companions.component';
import { Dnd5eOverviewPowersComponent } from './pages/dnd5e-sheets/overview/powers/powers.component';
import { Dnd5eOverviewPowerBarbarianComponent } from './pages/dnd5e-sheets/overview/powers/barbarian/barbarian.component';
import { Dnd5eOverviewPowerBardComponent } from './pages/dnd5e-sheets/overview/powers/bard/bard.component';
import { Dnd5eOverviewPowerClericComponent } from './pages/dnd5e-sheets/overview/powers/cleric/cleric.component';
import { Dnd5eOverviewPowerDruidComponent } from './pages/dnd5e-sheets/overview/powers/druid/druid.component';
import { Dnd5eOverviewPowerFighterComponent } from './pages/dnd5e-sheets/overview/powers/fighter/fighter.component';
import { Dnd5eOverviewPowerMonkComponent } from './pages/dnd5e-sheets/overview/powers/monk/monk.component';
import { Dnd5eOverviewPowerPaladinComponent } from './pages/dnd5e-sheets/overview/powers/paladin/paladin.component';
import { Dnd5eOverviewPowerRangerComponent } from './pages/dnd5e-sheets/overview/powers/ranger/ranger.component';
import { Dnd5eOverviewPowerRogueComponent } from './pages/dnd5e-sheets/overview/powers/rogue/rogue.component';
import { Dnd5eOverviewPowerSorcererComponent } from './pages/dnd5e-sheets/overview/powers/sorcerer/sorcerer.component';
import { Dnd5eOverviewPowerWarlockComponent } from './pages/dnd5e-sheets/overview/powers/warlock/warlock.component';
import { Dnd5eOverviewPowerWizardComponent } from './pages/dnd5e-sheets/overview/powers/wizard/wizard.component';
import { PathfinderSheetsComponent } from './pages/pathfinder-sheets/pathfinder-sheets.component';
import { Dnd5eBuilderPowerBarbarianComponent } from './pages/dnd5e-sheets/builder/powers/barbarian/barbarian.component';
import { Dnd5eBuilderPowerBardComponent } from './pages/dnd5e-sheets/builder/powers/bard/bard.component';
import { Dnd5eBuilderPowerClericComponent } from './pages/dnd5e-sheets/builder/powers/cleric/cleric.component';
import { Dnd5eBuilderPowerDruidComponent } from './pages/dnd5e-sheets/builder/powers/druid/druid.component';
import { Dnd5eBuilderPowerFighterComponent } from './pages/dnd5e-sheets/builder/powers/fighter/fighter.component';
import { Dnd5eBuilderPowerMonkComponent } from './pages/dnd5e-sheets/builder/powers/monk/monk.component';
import { Dnd5eBuilderPowerPaladinComponent } from './pages/dnd5e-sheets/builder/powers/paladin/paladin.component';
import { Dnd5eBuilderPowerRangerComponent } from './pages/dnd5e-sheets/builder/powers/ranger/ranger.component';
import { Dnd5eBuilderPowerRogueComponent } from './pages/dnd5e-sheets/builder/powers/rogue/rogue.component';
import { Dnd5eBuilderPowerSorcererComponent } from './pages/dnd5e-sheets/builder/powers/sorcerer/sorcerer.component';
import { Dnd5eBuilderPowerWarlockComponent } from './pages/dnd5e-sheets/builder/powers/warlock/warlock.component';
import { Dnd5eBuilderPowerWizardComponent } from './pages/dnd5e-sheets/builder/powers/wizard/wizard.component';
import { PathfinderTabAbilitiesComponent } from './pages/pathfinder-sheets/tabs/abilities/abilities.component';
import { PathfinderTabCombatComponent } from './pages/pathfinder-sheets/tabs/combat/combat.component';
import { PathfinderTabCompanionsComponent } from './pages/pathfinder-sheets/tabs/companions/companions.component';
import { PathfinderTabConditionsComponent } from './pages/pathfinder-sheets/tabs/conditions/conditions.component';
import { PathfinderTabDiceComponent } from './pages/pathfinder-sheets/tabs/dice/dice.component';
import { PathfinderTabEquipmentComponent } from './pages/pathfinder-sheets/tabs/equipment/equipment.component';
import { PathfinderTabFeatsComponent } from './pages/pathfinder-sheets/tabs/feats/feats.component';
import { PathfinderTabGeneralComponent } from './pages/pathfinder-sheets/tabs/general/general.component';
import { PathfinderTabItemsComponent } from './pages/pathfinder-sheets/tabs/items/items.component';
import { PathfinderTabJournalComponent } from './pages/pathfinder-sheets/tabs/journal/journal.component';
import { PathfinderTabListsComponent } from './pages/pathfinder-sheets/tabs/lists/lists.component';
import { PathfinderTabOverviewComponent } from './pages/pathfinder-sheets/tabs/overview/overview.component';
import { PathfinderTabSettingsComponent } from './pages/pathfinder-sheets/tabs/settings/settings.component';
import { PathfinderTabSkillsComponent } from './pages/pathfinder-sheets/tabs/skills/skills.component';
import { PathfinderTabSpellPickerComponent } from './pages/pathfinder-sheets/tabs/spell-picker/spell-picker.component';
import { PathfinderTabSpellbookComponent } from './pages/pathfinder-sheets/tabs/spellbook/spellbook.component';
import { PathfinderOverviewAbilitiesComponent } from './pages/pathfinder-sheets/overview/abilities/abilities.component';
import { PathfinderOverviewAttacksComponent } from './pages/pathfinder-sheets/overview/attacks/attacks.component';
import { PathfinderOverviewCompanionsComponent } from './pages/pathfinder-sheets/overview/companions/companions.component';
import { PathfinderOverviewConditionsComponent } from './pages/pathfinder-sheets/overview/conditions/conditions.component';
import { PathfinderOverviewConsumablesComponent } from './pages/pathfinder-sheets/overview/consumables/consumables.component';
import { PathfinderOverviewCustomStatsComponent } from './pages/pathfinder-sheets/overview/custom-stats/custom-stats.component';
import { PathfinderOverviewFeatsComponent } from './pages/pathfinder-sheets/overview/feats/feats.component';
import { PathfinderOverviewListsComponent } from './pages/pathfinder-sheets/overview/lists/lists.component';
import { PathfinderOverviewPowersComponent } from './pages/pathfinder-sheets/overview/powers/powers.component';
import { PathfinderOverviewSkillsComponent } from './pages/pathfinder-sheets/overview/skills/skills.component';
import { PathfinderOverviewSpellsComponent } from './pages/pathfinder-sheets/overview/spells/spells.component';
import { PathfinderOverviewValuablesComponent } from './pages/pathfinder-sheets/overview/valuables/valuables.component';
import { PathfinderOverviewVitalsComponent } from './pages/pathfinder-sheets/overview/vitals/vitals.component';
import { PathfinderOverviewWeightComponent } from './pages/pathfinder-sheets/overview/weight/weight.component';
import { RpgSheetsComponent } from './pages/rpg-sheets/rpg-sheets.component';
import { BattlemapsComponent } from './pages/battlemaps/battlemaps.component';
import { BattlemapActiveCardComponent } from './pages/battlemaps/active-card/active-card.component';
import { BattlemapContextMenuComponent } from './pages/battlemaps/context-menu/context-menu.component';
import { BattlemapModalsComponent } from './pages/battlemaps/modals/modals.component';
import { BattlemapShapeDrawingComponent, BtBattlemapDrawLayer } from './pages/battlemaps/shape-drawing/shape-drawing.component';
import { BattlemapShapeResizerComponent } from './pages/battlemaps/shape-resizer/shape-resizer.component';
import { BattlemapSceneTypeBattleComponent } from './pages/battlemaps/scene-types/battle/battle.component';
import { BattlemapSceneTypeOverviewComponent } from './pages/battlemaps/scene-types/overview/overview.component';
import { BattlemapSceneTypeIsometricComponent } from './pages/battlemaps/scene-types/isometric/isometric.component';
import { BattlemapSceneTypeHexagonComponent } from './pages/battlemaps/scene-types/hexagon/hexagon.component';
import { BattlemapDetailColorComponent } from './pages/battlemaps/detail/color/color.component';
import { BattlemapDetailDamageComponent } from './pages/battlemaps/detail/damage/damage.component';
import { BattlemapDetailFogComponent } from './pages/battlemaps/detail/fog/fog.component';
import { BattlemapDetailWindowComponent } from './pages/battlemaps/detail/window/window.component';
import { BattlemapDetailImageComponent } from './pages/battlemaps/detail/image/image.component';
import { BattlemapDetailLabelComponent } from './pages/battlemaps/detail/label/label.component';
import { BattlemapDetailSnappedComponent } from './pages/battlemaps/detail/snapped/snapped.component';
import { BattlemapDetailCombatComponent } from './pages/battlemaps/detail/combat/combat.component';
import { BattlemapDetailDrawableComponent } from './pages/battlemaps/detail/drawable/drawable.component';
import { BattlemapDetailPinnedComponent } from './pages/battlemaps/detail/pinned/pinned.component';
import { BattlemapDetailRoundComponent } from './pages/battlemaps/detail/round/round.component';
import { BattlemapDetailSizeComponent } from './pages/battlemaps/detail/size/size.component';
import { BattlemapDetailStatusComponent } from './pages/battlemaps/detail/status/status.component';
import { BattlemapDetailTileComponent } from './pages/battlemaps/detail/tile/tile.component';
import { BattlemapDetailLayeringComponent } from './pages/battlemaps/detail/layering/layering.component';
import { BattlemapDetailWidthComponent } from './pages/battlemaps/detail/width/width.component';
import { BattlemapDetailHeightComponent } from './pages/battlemaps/detail/height/height.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { Dnd5eBuilderIntroComponent } from './pages/dnd5e-sheets/builder/intro/intro.component';
import { Dnd5eBuilderCharacterComponent } from './pages/dnd5e-sheets/builder/character/character.component';
import { Dnd5eBuilderRaceComponent } from './pages/dnd5e-sheets/builder/race/race.component';
import { Dnd5eBuilderKlassComponent } from './pages/dnd5e-sheets/builder/klass/klass.component';
import { Dnd5eBuilderAbilitiesComponent } from './pages/dnd5e-sheets/builder/abilities/abilities.component';
import { Dnd5eBuilderProfileComponent } from './pages/dnd5e-sheets/builder/profile/profile.component';
import { Dnd5eBuilderEquipmentComponent } from './pages/dnd5e-sheets/builder/equipment/equipment.component';
import { Dnd5eBuilderSkillsComponent } from './pages/dnd5e-sheets/builder/skills/skills.component';
import { Dnd5eBuilderPowersComponent } from './pages/dnd5e-sheets/builder/powers/powers.component';
import { SpellsComponent } from './pages/dnd5e-sheets/builder/spells/spells.component';
import { Dnd5eBuilderListsComponent } from './pages/dnd5e-sheets/builder/lists/lists.component';
import { Dnd5eBuilderFinishedComponent } from './pages/dnd5e-sheets/builder/finished/finished.component';
import { InterfaceComponent } from './components/common/interface/interface.component';
import { GlobalErrorHandler } from './handlers/global-error.handler';
import { AuthGuard } from './auth.guard';
import { RpgCollectableInputBooleanComponent } from './pages/rpg-sheets/collectable-inputs/boolean/boolean.component';
import { RpgCollectableInputFormulaComponent } from './pages/rpg-sheets/collectable-inputs/formula/formula.component';
import { RpgCollectableInputNumberComponent } from './pages/rpg-sheets/collectable-inputs/number/number.component';
import { RpgCollectableInputReferenceComponent } from './pages/rpg-sheets/collectable-inputs/reference/reference.component';
import { RpgCollectableInputTextComponent } from './pages/rpg-sheets/collectable-inputs/text/text.component';
import { RpgCollectableInputTextareaComponent } from './pages/rpg-sheets/collectable-inputs/textarea/textarea.component';
import { RpgEntityCalculationComponent } from './pages/rpg-sheets/entities/calculation/calculation.component';
import { RpgEntityCollectionComponent } from './pages/rpg-sheets/entities/collection/collection.component';
import { RpgEntityConditionComponent } from './pages/rpg-sheets/entities/condition/condition.component';
import { RpgEntityStatComponent } from './pages/rpg-sheets/entities/stat/stat.component';
import { RpgStatInputBooleanComponent } from './pages/rpg-sheets/stat-inputs/boolean/boolean.component';
import { RpgStatInputNumberComponent } from './pages/rpg-sheets/stat-inputs/number/number.component';
import { RpgStatInputSelectComponent } from './pages/rpg-sheets/stat-inputs/select/select.component';
import { RpgStatInputTextComponent } from './pages/rpg-sheets/stat-inputs/text/text.component';
import { RpgStatInputTextareaComponent } from './pages/rpg-sheets/stat-inputs/textarea/textarea.component';
import { RpgOverviewCollectableTypeBooleanComponent } from './pages/rpg-sheets/overview/collectable-types/boolean/boolean.component';
import { RpgOverviewCollectableTypeFormulaComponent } from './pages/rpg-sheets/overview/collectable-types/formula/formula.component';
import { RpgOverviewCollectableTypeReferenceComponent } from './pages/rpg-sheets/overview/collectable-types/reference/reference.component';
import { RpgOverviewCollectableTypeValueComponent } from './pages/rpg-sheets/overview/collectable-types/value/value.component';
import { RpgOverviewEntityCalculationComponent } from './pages/rpg-sheets/overview/entities/calculation/calculation.component';
import { RpgOverviewEntityCollectionComponent } from './pages/rpg-sheets/overview/entities/collection/collection.component';
import { RpgOverviewEntityConditionComponent } from './pages/rpg-sheets/overview/entities/condition/condition.component';
import { RpgOverviewEntityStatComponent } from './pages/rpg-sheets/overview/entities/stat/stat.component';
import { CampaignAudioTypeMp3Component } from './pages/campaigns/audio-types/mp3/mp3.component';
import { CampaignAudioTypeOggComponent } from './pages/campaigns/audio-types/ogg/ogg.component';
import { CampaignAudioTypeYoutubeComponent } from './pages/campaigns/audio-types/youtube/youtube.component';
import { CampaignChatTypeDicerollComponent } from './pages/campaigns/chat-types/diceroll/diceroll.component';
import { CampaignChatTypeTextComponent } from './pages/campaigns/chat-types/text/text.component';
import { CampaignChatTypeSecretDicerollComponent } from './pages/campaigns/chat-types/secret-diceroll/secret-diceroll.component';
import { CampaignTabAdventureComponent } from './pages/campaigns/tabs/adventure/adventure.component';
import { CampaignTabMonstersComponent } from './pages/campaigns/tabs/monsters/monsters.component';
import { CampaignTabAudioComponent } from './pages/campaigns/tabs/audio/audio.component';
import { CampaignTabEnemiesComponent } from './pages/campaigns/tabs/enemies/enemies.component';
import { CampaignTabListsComponent } from './pages/campaigns/tabs/lists/lists.component';
import { CampaignTabNpcsComponent } from './pages/campaigns/tabs/npcs/npcs.component';
import { CampaignTabSettingsComponent } from './pages/campaigns/tabs/settings/settings.component';
import { CampaignTabSummaryComponent } from './pages/campaigns/tabs/summary/summary.component';
import { DonateComponent } from './pages/donate/donate.component';
import { SharingModalComponent } from './components/common/sharing-modal/sharing-modal.component';
import { BattlemapActiveCardDnd5eComponent } from './pages/battlemaps/active-card/dnd5e/dnd5e.component';
import { BattlemapActiveCardPathfinderComponent } from './pages/battlemaps/active-card/pathfinder/pathfinder.component';
import { BattlemapActiveCardRpgComponent } from './pages/battlemaps/active-card/rpg/rpg.component';
import { HomebrewKitsComponent } from './pages/homebrew-kits/homebrew-kits.component';
import { AccountComponent } from './pages/account/account.component';
import { HomebrewKitCollectionComponent } from './pages/homebrew-kits/collection/collection.component';
import { HomebrewKitTypeChooseComponent } from './pages/homebrew-kits/type/choose/choose.component';
import { HomebrewKitTypeOtherComponent } from './pages/homebrew-kits/type/other/other.component';
import { HomebrewKitCollectionDnd5eSpellComponent } from './pages/homebrew-kits/collection/dnd5e/spell/spell.component';
import { HomebrewKitCollectionDnd5eInvocationComponent } from './pages/homebrew-kits/collection/dnd5e/invocation/invocation.component';
import { HomebrewKitCollectionDnd5eKlassComponent } from './pages/homebrew-kits/collection/dnd5e/klass/klass.component';
import { HomebrewKitCollectionDnd5eBackgroundComponent } from './pages/homebrew-kits/collection/dnd5e/background/background.component';
import { HomebrewKitCollectionDnd5eArmorComponent } from './pages/homebrew-kits/collection/dnd5e/armor/armor.component';
import { HomebrewKitCollectionDnd5eWeaponComponent } from './pages/homebrew-kits/collection/dnd5e/weapon/weapon.component';
import { HelpComponent } from './pages/help/help.component';
import { BlogComponent } from './pages/blog/blog.component';
import { SocialFooterComponent } from './components/common/social-footer/social-footer.component';
import { StaticTabsComponent } from './components/common/static-tabs/static-tabs.component';
import { HelpFaqComponent } from './pages/help/faq/faq.component';
import { HelpOverviewCampaignsComponent } from './pages/help/overview-campaigns/overview-campaigns.component';
import { HelpOverviewDnd5eComponent } from './pages/help/overview-dnd5e/overview-dnd5e.component';
import { HelpOverviewPathfinderComponent } from './pages/help/overview-pathfinder/overview-pathfinder.component';
import { HelpOverviewBattlemapsComponent } from './pages/help/overview-battlemaps/overview-battlemaps.component';
import { HelpAlphaVsBetaComponent } from './pages/help/alpha-vs-beta/alpha-vs-beta.component';
import { StaticContainerComponent } from './components/common/static-container/static-container.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './admin.guard';
import { BattlemapActiveCardCustomComponent } from './pages/battlemaps/active-card/custom/custom.component';
import { HomebrewKitCollectionPathfinderSpellComponent } from './pages/homebrew-kits/collection/pathfinder/spell/spell.component';
import { HomebrewKitCollectionPathfinderFeatComponent } from './pages/homebrew-kits/collection/pathfinder/feat/feat.component';
import { HomebrewKitCollectionPathfinderKlassComponent } from './pages/homebrew-kits/collection/pathfinder/klass/klass.component';
import { HomebrewKitCollectionPathfinderArmorComponent } from './pages/homebrew-kits/collection/pathfinder/armor/armor.component';
import { HomebrewKitCollectionPathfinderWeaponComponent } from './pages/homebrew-kits/collection/pathfinder/weapon/weapon.component';
import { HelpOverviewRpgComponent } from './pages/help/overview-rpg/overview-rpg.component';
import { CampaignChatTypeHtmlComponent } from './pages/campaigns/chat-types/html/html.component';
import { BattlemapCombatPanelComponent } from './pages/battlemaps/combat-panel/combat-panel.component';
import { BattlemapCombatantComponent } from './pages/battlemaps/combat-panel/combatant/combatant.component';
import { BattlemapDetailLayerComponent } from './pages/battlemaps/detail/layer/layer.component';
import { Dnd5eEditAttackComponent } from './pages/dnd5e-sheets/components/attack/attack.component';
import { BattlemapDetailCombatantComponent } from './pages/battlemaps/detail/combatant/combatant.component';
import { BattlemapDetailOwnerComponent } from './pages/battlemaps/detail/owner/owner.component';
import { RpgOverviewTabComponent } from './pages/rpg-sheets/overview/tab/tab.component';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.heading = (text: string, level: number) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
    return `<h${level} class="markdown__${escapedText}">${text}</h${level}>`
  }

  return {
    renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardComponent,
    Dnd5eSheetsComponent,
    TabsComponent,
    LoadingComponent,
    Dnd5eTabOverviewComponent,
    Dnd5eTabGeneralComponent,
    Dnd5eTabAbilitiesComponent,
    Dnd5eTabCombatComponent,
    Dnd5eTabEquipmentComponent,
    Dnd5eTabPowersComponent,
    Dnd5eTabItemsComponent,
    Dnd5eTabListsComponent,
    Dnd5eTabJournalComponent,
    Dnd5eTabSpellbookComponent,
    Dnd5eTabConditionsComponent,
    Dnd5eTabCompanionsComponent,
    Dnd5eTabBuilderComponent,
    Dnd5eTabDiceComponent,
    Dnd5eTabSettingsComponent,
    Dnd5eTabPrintComponent,
    Dnd5eTabSpellPickerComponent,
    TabUpgradeComponent,
    HoldDeleteComponent,
    Dnd5ePowerBarbarianComponent,
    Dnd5ePowerBardComponent,
    Dnd5ePowerClericComponent,
    Dnd5ePowerDruidComponent,
    Dnd5ePowerFighterComponent,
    Dnd5ePowerMonkComponent,
    Dnd5ePowerPaladinComponent,
    Dnd5ePowerRangerComponent,
    Dnd5ePowerRogueComponent,
    Dnd5ePowerSorcererComponent,
    Dnd5ePowerWarlockComponent,
    Dnd5ePowerWizardComponent,
    Dnd5eOverviewAttacksComponent,
    Dnd5eOverviewVitalsComponent,
    Dnd5eOverviewRestComponent,
    Dnd5eOverviewWeightComponent,
    Dnd5eOverviewAbilitiesComponent,
    Dnd5eOverviewSkillsComponent,
    Dnd5eOverviewConditionsComponent,
    Dnd5eOverviewListsComponent,
    Dnd5eOverviewCustomStatsComponent,
    Dnd5eOverviewConsumablesComponent,
    Dnd5eOverviewValuablesComponent,
    Dnd5eOverviewFeatsComponent,
    Dnd5eOverviewSpellsComponent,
    Dnd5eOverviewCompanionsComponent,
    Dnd5eOverviewPowersComponent,
    Dnd5eOverviewPowerBarbarianComponent,
    Dnd5eOverviewPowerBardComponent,
    Dnd5eOverviewPowerClericComponent,
    Dnd5eOverviewPowerDruidComponent,
    Dnd5eOverviewPowerFighterComponent,
    Dnd5eOverviewPowerMonkComponent,
    Dnd5eOverviewPowerPaladinComponent,
    Dnd5eOverviewPowerRangerComponent,
    Dnd5eOverviewPowerRogueComponent,
    Dnd5eOverviewPowerSorcererComponent,
    Dnd5eOverviewPowerWarlockComponent,
    Dnd5eOverviewPowerWizardComponent,
    PathfinderSheetsComponent,
    Dnd5eBuilderPowerBarbarianComponent,
    Dnd5eBuilderPowerBardComponent,
    Dnd5eBuilderPowerClericComponent,
    Dnd5eBuilderPowerDruidComponent,
    Dnd5eBuilderPowerFighterComponent,
    Dnd5eBuilderPowerMonkComponent,
    Dnd5eBuilderPowerPaladinComponent,
    Dnd5eBuilderPowerRangerComponent,
    Dnd5eBuilderPowerRogueComponent,
    Dnd5eBuilderPowerSorcererComponent,
    Dnd5eBuilderPowerWarlockComponent,
    Dnd5eBuilderPowerWizardComponent,
    PathfinderTabAbilitiesComponent,
    PathfinderTabCombatComponent,
    PathfinderTabCompanionsComponent,
    PathfinderTabConditionsComponent,
    PathfinderTabDiceComponent,
    PathfinderTabEquipmentComponent,
    PathfinderTabFeatsComponent,
    PathfinderTabGeneralComponent,
    PathfinderTabItemsComponent,
    PathfinderTabListsComponent,
    PathfinderTabOverviewComponent,
    PathfinderTabSettingsComponent,
    PathfinderTabSkillsComponent,
    PathfinderTabSpellbookComponent,
    PathfinderTabJournalComponent,
    PathfinderTabSpellPickerComponent,
    PathfinderOverviewAbilitiesComponent,
    PathfinderOverviewAttacksComponent,
    PathfinderOverviewCompanionsComponent,
    PathfinderOverviewConditionsComponent,
    PathfinderOverviewVitalsComponent,
    PathfinderOverviewWeightComponent,
    PathfinderOverviewCustomStatsComponent,
    PathfinderOverviewFeatsComponent,
    PathfinderOverviewListsComponent,
    PathfinderOverviewConsumablesComponent,
    PathfinderOverviewValuablesComponent,
    PathfinderOverviewSpellsComponent,
    PathfinderOverviewPowersComponent,
    PathfinderOverviewSkillsComponent,
    RpgSheetsComponent,
    BattlemapsComponent,
    BattlemapContextMenuComponent,
    BattlemapActiveCardComponent,
    BattlemapModalsComponent,
    BattlemapShapeDrawingComponent,
    BattlemapShapeResizerComponent,
    BattlemapSceneTypeBattleComponent,
    BattlemapSceneTypeOverviewComponent,
    BattlemapSceneTypeIsometricComponent,
    BattlemapSceneTypeHexagonComponent,
    BattlemapDetailColorComponent,
    BattlemapDetailDamageComponent,
    BattlemapDetailFogComponent,
    BattlemapDetailWindowComponent,
    BattlemapDetailImageComponent,
    BattlemapDetailLabelComponent,
    BattlemapDetailSnappedComponent,
    BattlemapDetailCombatComponent,
    BattlemapDetailDrawableComponent,
    BattlemapDetailPinnedComponent,
    BattlemapDetailRoundComponent,
    BattlemapDetailSizeComponent,
    BattlemapDetailStatusComponent,
    BattlemapDetailTileComponent,
    BattlemapDetailLayeringComponent,
    BattlemapDetailWidthComponent,
    BattlemapDetailHeightComponent,
    CampaignsComponent,
    Dnd5eBuilderIntroComponent,
    Dnd5eBuilderCharacterComponent,
    Dnd5eBuilderRaceComponent,
    Dnd5eBuilderKlassComponent,
    Dnd5eBuilderAbilitiesComponent,
    Dnd5eBuilderProfileComponent,
    Dnd5eBuilderEquipmentComponent,
    Dnd5eBuilderSkillsComponent,
    Dnd5eBuilderPowersComponent,
    SpellsComponent,
    Dnd5eBuilderListsComponent,
    Dnd5eBuilderFinishedComponent,
    InterfaceComponent,
    RpgCollectableInputBooleanComponent,
    RpgCollectableInputFormulaComponent,
    RpgCollectableInputNumberComponent,
    RpgCollectableInputReferenceComponent,
    RpgCollectableInputTextComponent,
    RpgCollectableInputTextareaComponent,
    RpgEntityCalculationComponent,
    RpgEntityCollectionComponent,
    RpgEntityConditionComponent,
    RpgEntityStatComponent,
    RpgStatInputBooleanComponent,
    RpgStatInputNumberComponent,
    RpgStatInputSelectComponent,
    RpgStatInputTextComponent,
    RpgStatInputTextareaComponent,
    RpgOverviewCollectableTypeBooleanComponent,
    RpgOverviewCollectableTypeFormulaComponent,
    RpgOverviewCollectableTypeReferenceComponent,
    RpgOverviewCollectableTypeValueComponent,
    RpgOverviewEntityCalculationComponent,
    RpgOverviewEntityCollectionComponent,
    RpgOverviewEntityConditionComponent,
    RpgOverviewEntityStatComponent,
    CampaignAudioTypeMp3Component,
    CampaignAudioTypeOggComponent,
    CampaignAudioTypeYoutubeComponent,
    CampaignChatTypeDicerollComponent,
    CampaignChatTypeTextComponent,
    CampaignChatTypeSecretDicerollComponent,
    CampaignTabAdventureComponent,
    CampaignTabMonstersComponent,
    CampaignTabAudioComponent,
    CampaignTabEnemiesComponent,
    CampaignTabListsComponent,
    CampaignTabNpcsComponent,
    CampaignTabSettingsComponent,
    CampaignTabSummaryComponent,
    DonateComponent,
    BtBattlemapDrawLayer,
    SharingModalComponent,
    BattlemapActiveCardDnd5eComponent,
    BattlemapActiveCardPathfinderComponent,
    BattlemapActiveCardRpgComponent,
    HomebrewKitsComponent,
    AccountComponent,
    HomebrewKitCollectionComponent,
    HomebrewKitTypeChooseComponent,
    HomebrewKitTypeOtherComponent,
    HomebrewKitCollectionDnd5eSpellComponent,
    HomebrewKitCollectionDnd5eInvocationComponent,
    HomebrewKitCollectionDnd5eKlassComponent,
    HomebrewKitCollectionDnd5eBackgroundComponent,
    HomebrewKitCollectionDnd5eArmorComponent,
    HomebrewKitCollectionDnd5eWeaponComponent,
    HelpComponent,
    BlogComponent,
    SocialFooterComponent,
    StaticTabsComponent,
    HelpFaqComponent,
    HelpOverviewCampaignsComponent,
    HelpOverviewDnd5eComponent,
    HelpOverviewPathfinderComponent,
    HelpOverviewBattlemapsComponent,
    HelpAlphaVsBetaComponent,
    StaticContainerComponent,
    AdminComponent,
    BattlemapActiveCardCustomComponent,
    HomebrewKitCollectionPathfinderSpellComponent,
    HomebrewKitCollectionPathfinderFeatComponent,
    HomebrewKitCollectionPathfinderKlassComponent,
    HomebrewKitCollectionPathfinderArmorComponent,
    HomebrewKitCollectionPathfinderWeaponComponent,
    HelpOverviewRpgComponent,
    CampaignChatTypeHtmlComponent,
    BattlemapCombatPanelComponent,
    BattlemapCombatantComponent,
    BattlemapDetailLayerComponent,
    Dnd5eEditAttackComponent,
    BattlemapDetailCombatantComponent,
    BattlemapDetailOwnerComponent,
    RpgOverviewTabComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    OrderModule,
    DragDropModule,
    HttpClientModule,
    BrowserModule,
    ColorPickerModule,
    NgxYoutubePlayerModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAtkNdM9IxuU3xOgTUOjllvisPJYREJjvE',
      authDomain: 'btt-firestore.firebaseapp.com',
      databaseURL: 'https://btt-firestore.firebaseio.com',
      projectId: 'btt-firestore',
      storageBucket: 'btt-firestore.appspot.com',
      messagingSenderId: '375298002497'
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class AppModule {
  constructor(
    library: FaIconLibrary,
  ) {
    library.addIcons(
      faDiscord,
      faFacebookF,
      faRedditAlien,
      faTwitter,
      faGoogle,
      faApple,
      faAndroid,
      faWindows,
      faArrowCircleRight,
      faDollarSign,
      faEdit,
      faMapMarker,
      faCopy,
      faPlus,
      faShare,
      faTrash,
      faFire,
      faAngleLeft,
      faCog,
      faBars,
      faSortDown,
      faSort,
      faStar,
      faPencilAlt,
      faList,
      faCheck,
      faChevronDown,
      faChevronRight,
      faBullhorn,
      faExclamationTriangle,
      faMinus,
      faCheckDouble,
      faTimes,
      faBackward,
      faForward,
      faCaretRight,
      faCaretLeft,
      faCaretUp,
      faCaretDown,
      faChevronLeft,
      faAngleUp,
      faAngleDown,
      faAngleDoubleUp,
      faAngleDoubleDown,
      faCircle,
      faCertificate,
      faMinusCircle,
      faSkull,
    );
  }
}
