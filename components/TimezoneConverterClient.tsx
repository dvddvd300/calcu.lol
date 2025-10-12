'use client';

import {useState, useMemo, JSX} from 'react';
import {useTranslations} from 'next-intl';
import Calculator2In1Out, {CalculatorConfig} from './Calculator2In1Out';

export default function TimezoneConverterClient() {
  const t = useTranslations('timezoneConverter');
  
  const [dateTime, setDateTime] = useState(() => {
    // Auto-fill with current date and time
    const now = new Date();
    return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM format
  });
  const [fromTimezone, setFromTimezone] = useState('UTC');
  const [toTimezone, setToTimezone] = useState('America/New_York');

  // Complete timezone list based on official tz database
  const timezones = [
    // UTC Offset Options (Direct UTC offsets)
    {value: 'UTC-12', label: 'UTC-12 (Baker Island Time)'},
    {value: 'UTC-11', label: 'UTC-11 (Niue Time)'},
    {value: 'UTC-10', label: 'UTC-10 (Hawaii Time)'},
    {value: 'UTC-9:30', label: 'UTC-9:30 (Marquesas Time)'},
    {value: 'UTC-9', label: 'UTC-9 (Alaska Time)'},
    {value: 'UTC-8', label: 'UTC-8 (Pacific Time)'},
    {value: 'UTC-7', label: 'UTC-7 (Mountain Time)'},
    {value: 'UTC-6', label: 'UTC-6 (Central Time)'},
    {value: 'UTC-5', label: 'UTC-5 (Eastern Time)'},
    {value: 'UTC-4', label: 'UTC-4 (Atlantic Time)'},
    {value: 'UTC-3:30', label: 'UTC-3:30 (Newfoundland Time)'},
    {value: 'UTC-3', label: 'UTC-3 (Brasilia Time)'},
    {value: 'UTC-2', label: 'UTC-2 (Mid-Atlantic Time)'},
    {value: 'UTC-1', label: 'UTC-1 (Azores Time)'},
    {value: 'UTC', label: 'UTC (Coordinated Universal Time)'},
    {value: 'UTC+1', label: 'UTC+1 (Central European Time)'},
    {value: 'UTC+2', label: 'UTC+2 (Eastern European Time)'},
    {value: 'UTC+3', label: 'UTC+3 (Moscow Time)'},
    {value: 'UTC+3:30', label: 'UTC+3:30 (Iran Time)'},
    {value: 'UTC+4', label: 'UTC+4 (Gulf Time)'},
    {value: 'UTC+4:30', label: 'UTC+4:30 (Afghanistan Time)'},
    {value: 'UTC+5', label: 'UTC+5 (Pakistan Time)'},
    {value: 'UTC+5:30', label: 'UTC+5:30 (India Time)'},
    {value: 'UTC+5:45', label: 'UTC+5:45 (Nepal Time)'},
    {value: 'UTC+6', label: 'UTC+6 (Bangladesh Time)'},
    {value: 'UTC+6:30', label: 'UTC+6:30 (Myanmar Time)'},
    {value: 'UTC+7', label: 'UTC+7 (Indochina Time)'},
    {value: 'UTC+8', label: 'UTC+8 (China Time)'},
    {value: 'UTC+8:30', label: 'UTC+8:30 (North Korea Time)'},
    {value: 'UTC+9', label: 'UTC+9 (Japan Time)'},
    {value: 'UTC+9:30', label: 'UTC+9:30 (Australian Central Time)'},
    {value: 'UTC+10', label: 'UTC+10 (Australian Eastern Time)'},
    {value: 'UTC+10:30', label: 'UTC+10:30 (Lord Howe Time)'},
    {value: 'UTC+11', label: 'UTC+11 (Solomon Islands Time)'},
    {value: 'UTC+12', label: 'UTC+12 (New Zealand Time)'},
    {value: 'UTC+12:45', label: 'UTC+12:45 (Chatham Time)'},
    {value: 'UTC+13', label: 'UTC+13 (Tonga Time)'},
    {value: 'UTC+14', label: 'UTC+14 (Line Islands Time)'},
    
    // Africa
    {value: 'Africa/Abidjan', label: 'Abidjan (GMT) UTC+0'},
    {value: 'Africa/Accra', label: 'Accra (GMT) UTC+0'},
    {value: 'Africa/Addis_Ababa', label: 'Addis Ababa (EAT) UTC+3'},
    {value: 'Africa/Algiers', label: 'Algiers (CET) UTC+1'},
    {value: 'Africa/Asmara', label: 'Asmara (EAT) UTC+3'},
    {value: 'Africa/Bamako', label: 'Bamako (GMT) UTC+0'},
    {value: 'Africa/Bangui', label: 'Bangui (WAT) UTC+1'},
    {value: 'Africa/Banjul', label: 'Banjul (GMT) UTC+0'},
    {value: 'Africa/Bissau', label: 'Bissau (GMT) UTC+0'},
    {value: 'Africa/Blantyre', label: 'Blantyre (CAT) UTC+2'},
    {value: 'Africa/Brazzaville', label: 'Brazzaville (WAT) UTC+1'},
    {value: 'Africa/Bujumbura', label: 'Bujumbura (CAT) UTC+2'},
    {value: 'Africa/Cairo', label: 'Cairo (EET/EEST) UTC+2/+3'},
    {value: 'Africa/Casablanca', label: 'Casablanca (WET) UTC+0/+1'},
    {value: 'Africa/Ceuta', label: 'Ceuta (CET/CEST) UTC+1/+2'},
    {value: 'Africa/Conakry', label: 'Conakry (GMT) UTC+0'},
    {value: 'Africa/Dakar', label: 'Dakar (GMT) UTC+0'},
    {value: 'Africa/Dar_es_Salaam', label: 'Dar es Salaam (EAT) UTC+3'},
    {value: 'Africa/Djibouti', label: 'Djibouti (EAT) UTC+3'},
    {value: 'Africa/Douala', label: 'Douala (WAT) UTC+1'},
    {value: 'Africa/El_Aaiun', label: 'El Aaiun (WET) UTC+0/+1'},
    {value: 'Africa/Freetown', label: 'Freetown (GMT) UTC+0'},
    {value: 'Africa/Gaborone', label: 'Gaborone (CAT) UTC+2'},
    {value: 'Africa/Harare', label: 'Harare (CAT) UTC+2'},
    {value: 'Africa/Johannesburg', label: 'Johannesburg (SAST) UTC+2'},
    {value: 'Africa/Juba', label: 'Juba (CAT) UTC+2'},
    {value: 'Africa/Kampala', label: 'Kampala (EAT) UTC+3'},
    {value: 'Africa/Khartoum', label: 'Khartoum (CAT) UTC+2'},
    {value: 'Africa/Kigali', label: 'Kigali (CAT) UTC+2'},
    {value: 'Africa/Kinshasa', label: 'Kinshasa (WAT) UTC+1'},
    {value: 'Africa/Lagos', label: 'Lagos (WAT) UTC+1'},
    {value: 'Africa/Libreville', label: 'Libreville (WAT) UTC+1'},
    {value: 'Africa/Lome', label: 'Lome (GMT) UTC+0'},
    {value: 'Africa/Luanda', label: 'Luanda (WAT) UTC+1'},
    {value: 'Africa/Lubumbashi', label: 'Lubumbashi (CAT) UTC+2'},
    {value: 'Africa/Lusaka', label: 'Lusaka (CAT) UTC+2'},
    {value: 'Africa/Malabo', label: 'Malabo (WAT) UTC+1'},
    {value: 'Africa/Maputo', label: 'Maputo (CAT) UTC+2'},
    {value: 'Africa/Maseru', label: 'Maseru (SAST) UTC+2'},
    {value: 'Africa/Mbabane', label: 'Mbabane (SAST) UTC+2'},
    {value: 'Africa/Mogadishu', label: 'Mogadishu (EAT) UTC+3'},
    {value: 'Africa/Monrovia', label: 'Monrovia (GMT) UTC+0'},
    {value: 'Africa/Nairobi', label: 'Nairobi (EAT) UTC+3'},
    {value: 'Africa/Ndjamena', label: 'Ndjamena (WAT) UTC+1'},
    {value: 'Africa/Niamey', label: 'Niamey (WAT) UTC+1'},
    {value: 'Africa/Nouakchott', label: 'Nouakchott (GMT) UTC+0'},
    {value: 'Africa/Ouagadougou', label: 'Ouagadougou (GMT) UTC+0'},
    {value: 'Africa/Porto-Novo', label: 'Porto-Novo (WAT) UTC+1'},
    {value: 'Africa/Sao_Tome', label: 'Sao Tome (GMT) UTC+0'},
    {value: 'Africa/Timbuktu', label: 'Timbuktu (GMT) UTC+0'},
    {value: 'Africa/Tripoli', label: 'Tripoli (EET) UTC+2'},
    {value: 'Africa/Tunis', label: 'Tunis (CET) UTC+1'},
    {value: 'Africa/Windhoek', label: 'Windhoek (CAT) UTC+2'},
    
    // Americas
    {value: 'America/Adak', label: 'Adak (HST/HDT) UTC-10/-9'},
    {value: 'America/Anchorage', label: 'Anchorage (AKST/AKDT) UTC-9/-8'},
    {value: 'America/Anguilla', label: 'Anguilla (AST) UTC-4'},
    {value: 'America/Antigua', label: 'Antigua (AST) UTC-4'},
    {value: 'America/Araguaina', label: 'Araguaina (BRT) UTC-3'},
    {value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires (ART) UTC-3'},
    {value: 'America/Argentina/Catamarca', label: 'Catamarca (ART) UTC-3'},
    {value: 'America/Argentina/Cordoba', label: 'Cordoba (ART) UTC-3'},
    {value: 'America/Argentina/Jujuy', label: 'Jujuy (ART) UTC-3'},
    {value: 'America/Argentina/La_Rioja', label: 'La Rioja (ART) UTC-3'},
    {value: 'America/Argentina/Mendoza', label: 'Mendoza (ART) UTC-3'},
    {value: 'America/Argentina/Rio_Gallegos', label: 'Rio Gallegos (ART) UTC-3'},
    {value: 'America/Argentina/Salta', label: 'Salta (ART) UTC-3'},
    {value: 'America/Argentina/San_Juan', label: 'San Juan (ART) UTC-3'},
    {value: 'America/Argentina/San_Luis', label: 'San Luis (ART) UTC-3'},
    {value: 'America/Argentina/Tucuman', label: 'Tucuman (ART) UTC-3'},
    {value: 'America/Argentina/Ushuaia', label: 'Ushuaia (ART) UTC-3'},
    {value: 'America/Aruba', label: 'Aruba (AST) UTC-4'},
    {value: 'America/Asuncion', label: 'Asuncion (PYT) UTC-3'},
    {value: 'America/Atikokan', label: 'Atikokan (EST) UTC-5'},
    {value: 'America/Bahia', label: 'Bahia (BRT) UTC-3'},
    {value: 'America/Bahia_Banderas', label: 'Bahia Banderas (CST) UTC-6'},
    {value: 'America/Barbados', label: 'Barbados (AST) UTC-4'},
    {value: 'America/Belem', label: 'Belem (BRT) UTC-3'},
    {value: 'America/Belize', label: 'Belize (CST) UTC-6'},
    {value: 'America/Blanc-Sablon', label: 'Blanc-Sablon (AST) UTC-4'},
    {value: 'America/Boa_Vista', label: 'Boa Vista (AMT) UTC-4'},
    {value: 'America/Bogota', label: 'Bogota (COT) UTC-5'},
    {value: 'America/Boise', label: 'Boise (MST/MDT) UTC-7/-6'},
    {value: 'America/Buenos_Aires', label: 'Buenos Aires (ART) UTC-3'},
    {value: 'America/Cambridge_Bay', label: 'Cambridge Bay (MST/MDT) UTC-7/-6'},
    {value: 'America/Campo_Grande', label: 'Campo Grande (AMT) UTC-4'},
    {value: 'America/Cancun', label: 'Cancun (EST) UTC-5'},
    {value: 'America/Caracas', label: 'Caracas (VET) UTC-4'},
    {value: 'America/Catamarca', label: 'Catamarca (ART) UTC-3'},
    {value: 'America/Cayenne', label: 'Cayenne (GFT) UTC-3'},
    {value: 'America/Cayman', label: 'Cayman (EST) UTC-5'},
    {value: 'America/Chicago', label: 'Chicago (CST/CDT) UTC-6/-5'},
    {value: 'America/Chihuahua', label: 'Chihuahua (CST) UTC-6'},
    {value: 'America/Ciudad_Juarez', label: 'Ciudad Juarez (MST/MDT) UTC-7/-6'},
    {value: 'America/Coral_Harbour', label: 'Coral Harbour (EST) UTC-5'},
    {value: 'America/Cordoba', label: 'Cordoba (ART) UTC-3'},
    {value: 'America/Costa_Rica', label: 'Costa Rica (CST) UTC-6'},
    {value: 'America/Coyhaique', label: 'Coyhaique (CLT) UTC-3'},
    {value: 'America/Creston', label: 'Creston (MST) UTC-7'},
    {value: 'America/Cuiaba', label: 'Cuiaba (AMT) UTC-4'},
    {value: 'America/Curacao', label: 'Curacao (AST) UTC-4'},
    {value: 'America/Danmarkshavn', label: 'Danmarkshavn (GMT) UTC+0'},
    {value: 'America/Dawson', label: 'Dawson (MST) UTC-7'},
    {value: 'America/Dawson_Creek', label: 'Dawson Creek (MST) UTC-7'},
    {value: 'America/Denver', label: 'Denver (MST/MDT) UTC-7/-6'},
    {value: 'America/Detroit', label: 'Detroit (EST/EDT) UTC-5/-4'},
    {value: 'America/Dominica', label: 'Dominica (AST) UTC-4'},
    {value: 'America/Edmonton', label: 'Edmonton (MST/MDT) UTC-7/-6'},
    {value: 'America/Eirunepe', label: 'Eirunepe (ACT) UTC-5'},
    {value: 'America/El_Salvador', label: 'El Salvador (CST) UTC-6'},
    {value: 'America/Ensenada', label: 'Ensenada (PST/PDT) UTC-8/-7'},
    {value: 'America/Fort_Nelson', label: 'Fort Nelson (MST) UTC-7'},
    {value: 'America/Fort_Wayne', label: 'Fort Wayne (EST/EDT) UTC-5/-4'},
    {value: 'America/Fortaleza', label: 'Fortaleza (BRT) UTC-3'},
    {value: 'America/Glace_Bay', label: 'Glace Bay (AST/ADT) UTC-4/-3'},
    {value: 'America/Godthab', label: 'Godthab (WGT/WGST) UTC-3/-2'},
    {value: 'America/Goose_Bay', label: 'Goose Bay (AST/ADT) UTC-4/-3'},
    {value: 'America/Grand_Turk', label: 'Grand Turk (EST/EDT) UTC-5/-4'},
    {value: 'America/Grenada', label: 'Grenada (AST) UTC-4'},
    {value: 'America/Guadeloupe', label: 'Guadeloupe (AST) UTC-4'},
    {value: 'America/Guatemala', label: 'Guatemala (CST) UTC-6'},
    {value: 'America/Guayaquil', label: 'Guayaquil (ECT) UTC-5'},
    {value: 'America/Guyana', label: 'Guyana (GYT) UTC-4'},
    {value: 'America/Halifax', label: 'Halifax (AST/ADT) UTC-4/-3'},
    {value: 'America/Havana', label: 'Havana (CST/CDT) UTC-5/-4'},
    {value: 'America/Hermosillo', label: 'Hermosillo (MST) UTC-7'},
    {value: 'America/Indiana/Indianapolis', label: 'Indianapolis (EST/EDT) UTC-5/-4'},
    {value: 'America/Indiana/Knox', label: 'Knox (CST/CDT) UTC-6/-5'},
    {value: 'America/Indiana/Marengo', label: 'Marengo (EST/EDT) UTC-5/-4'},
    {value: 'America/Indiana/Petersburg', label: 'Petersburg (EST/EDT) UTC-5/-4'},
    {value: 'America/Indiana/Tell_City', label: 'Tell City (CST/CDT) UTC-6/-5'},
    {value: 'America/Indiana/Vevay', label: 'Vevay (EST/EDT) UTC-5/-4'},
    {value: 'America/Indiana/Vincennes', label: 'Vincennes (EST/EDT) UTC-5/-4'},
    {value: 'America/Indiana/Winamac', label: 'Winamac (EST/EDT) UTC-5/-4'},
    {value: 'America/Indianapolis', label: 'Indianapolis (EST/EDT) UTC-5/-4'},
    {value: 'America/Inuvik', label: 'Inuvik (MST/MDT) UTC-7/-6'},
    {value: 'America/Iqaluit', label: 'Iqaluit (EST/EDT) UTC-5/-4'},
    {value: 'America/Jamaica', label: 'Jamaica (EST) UTC-5'},
    {value: 'America/Jujuy', label: 'Jujuy (ART) UTC-3'},
    {value: 'America/Juneau', label: 'Juneau (AKST/AKDT) UTC-9/-8'},
    {value: 'America/Kentucky/Louisville', label: 'Louisville (EST/EDT) UTC-5/-4'},
    {value: 'America/Kentucky/Monticello', label: 'Monticello (EST/EDT) UTC-5/-4'},
    {value: 'America/Knox_IN', label: 'Knox (CST/CDT) UTC-6/-5'},
    {value: 'America/Kralendijk', label: 'Kralendijk (AST) UTC-4'},
    {value: 'America/La_Paz', label: 'La Paz (BOT) UTC-4'},
    {value: 'America/Lima', label: 'Lima (PET) UTC-5'},
    {value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT) UTC-8/-7'},
    {value: 'America/Louisville', label: 'Louisville (EST/EDT) UTC-5/-4'},
    {value: 'America/Lower_Princes', label: 'Lower Prince\'s Quarter (AST) UTC-4'},
    {value: 'America/Maceio', label: 'Maceio (BRT) UTC-3'},
    {value: 'America/Managua', label: 'Managua (CST) UTC-6'},
    {value: 'America/Manaus', label: 'Manaus (AMT) UTC-4'},
    {value: 'America/Marigot', label: 'Marigot (AST) UTC-4'},
    {value: 'America/Martinique', label: 'Martinique (AST) UTC-4'},
    {value: 'America/Matamoros', label: 'Matamoros (CST/CDT) UTC-6/-5'},
    {value: 'America/Mazatlan', label: 'Mazatlan (MST) UTC-7'},
    {value: 'America/Mendoza', label: 'Mendoza (ART) UTC-3'},
    {value: 'America/Menominee', label: 'Menominee (CST/CDT) UTC-6/-5'},
    {value: 'America/Merida', label: 'Merida (CST) UTC-6'},
    {value: 'America/Metlakatla', label: 'Metlakatla (AKST/AKDT) UTC-9/-8'},
    {value: 'America/Mexico_City', label: 'Mexico City (CST) UTC-6'},
    {value: 'America/Miquelon', label: 'Miquelon (PMST/PMDT) UTC-3/-2'},
    {value: 'America/Moncton', label: 'Moncton (AST/ADT) UTC-4/-3'},
    {value: 'America/Monterrey', label: 'Monterrey (CST) UTC-6'},
    {value: 'America/Montevideo', label: 'Montevideo (UYT) UTC-3'},
    {value: 'America/Montreal', label: 'Montreal (EST/EDT) UTC-5/-4'},
    {value: 'America/Montserrat', label: 'Montserrat (AST) UTC-4'},
    {value: 'America/Nassau', label: 'Nassau (EST/EDT) UTC-5/-4'},
    {value: 'America/New_York', label: 'New York (EST/EDT) UTC-5/-4'},
    {value: 'America/Nipigon', label: 'Nipigon (EST/EDT) UTC-5/-4'},
    {value: 'America/Nome', label: 'Nome (AKST/AKDT) UTC-9/-8'},
    {value: 'America/Noronha', label: 'Noronha (FNT) UTC-2'},
    {value: 'America/North_Dakota/Beulah', label: 'Beulah (CST/CDT) UTC-6/-5'},
    {value: 'America/North_Dakota/Center', label: 'Center (CST/CDT) UTC-6/-5'},
    {value: 'America/North_Dakota/New_Salem', label: 'New Salem (CST/CDT) UTC-6/-5'},
    {value: 'America/Nuuk', label: 'Nuuk (WGT/WGST) UTC-3/-2'},
    {value: 'America/Ojinaga', label: 'Ojinaga (CST/CDT) UTC-6/-5'},
    {value: 'America/Panama', label: 'Panama (EST) UTC-5'},
    {value: 'America/Pangnirtung', label: 'Pangnirtung (EST/EDT) UTC-5/-4'},
    {value: 'America/Paramaribo', label: 'Paramaribo (SRT) UTC-3'},
    {value: 'America/Phoenix', label: 'Phoenix (MST) UTC-7'},
    {value: 'America/Port_of_Spain', label: 'Port of Spain (AST) UTC-4'},
    {value: 'America/Port-au-Prince', label: 'Port-au-Prince (EST/EDT) UTC-5/-4'},
    {value: 'America/Porto_Acre', label: 'Porto Acre (ACT) UTC-5'},
    {value: 'America/Porto_Velho', label: 'Porto Velho (AMT) UTC-4'},
    {value: 'America/Puerto_Rico', label: 'Puerto Rico (AST) UTC-4'},
    {value: 'America/Punta_Arenas', label: 'Punta Arenas (CLT) UTC-3'},
    {value: 'America/Rainy_River', label: 'Rainy River (CST/CDT) UTC-6/-5'},
    {value: 'America/Rankin_Inlet', label: 'Rankin Inlet (CST/CDT) UTC-6/-5'},
    {value: 'America/Recife', label: 'Recife (BRT) UTC-3'},
    {value: 'America/Regina', label: 'Regina (CST) UTC-6'},
    {value: 'America/Resolute', label: 'Resolute (CST/CDT) UTC-6/-5'},
    {value: 'America/Rio_Branco', label: 'Rio Branco (ACT) UTC-5'},
    {value: 'America/Rosario', label: 'Rosario (ART) UTC-3'},
    {value: 'America/Santa_Isabel', label: 'Santa Isabel (PST/PDT) UTC-8/-7'},
    {value: 'America/Santarem', label: 'Santarem (BRT) UTC-3'},
    {value: 'America/Santiago', label: 'Santiago (CLT/CLST) UTC-4/-3'},
    {value: 'America/Santo_Domingo', label: 'Santo Domingo (AST) UTC-4'},
    {value: 'America/Sao_Paulo', label: 'Sao Paulo (BRT) UTC-3'},
    {value: 'America/Scoresbysund', label: 'Scoresbysund (EGT/EGST) UTC-1/+0'},
    {value: 'America/Shiprock', label: 'Shiprock (MST/MDT) UTC-7/-6'},
    {value: 'America/Sitka', label: 'Sitka (AKST/AKDT) UTC-9/-8'},
    {value: 'America/St_Barthelemy', label: 'St Barthelemy (AST) UTC-4'},
    {value: 'America/St_Johns', label: 'St Johns (NST/NDT) UTC-3:30/-2:30'},
    {value: 'America/St_Kitts', label: 'St Kitts (AST) UTC-4'},
    {value: 'America/St_Lucia', label: 'St Lucia (AST) UTC-4'},
    {value: 'America/St_Thomas', label: 'St Thomas (AST) UTC-4'},
    {value: 'America/St_Vincent', label: 'St Vincent (AST) UTC-4'},
    {value: 'America/Swift_Current', label: 'Swift Current (CST) UTC-6'},
    {value: 'America/Tegucigalpa', label: 'Tegucigalpa (CST) UTC-6'},
    {value: 'America/Thule', label: 'Thule (AST/ADT) UTC-4/-3'},
    {value: 'America/Thunder_Bay', label: 'Thunder Bay (EST/EDT) UTC-5/-4'},
    {value: 'America/Tijuana', label: 'Tijuana (PST/PDT) UTC-8/-7'},
    {value: 'America/Toronto', label: 'Toronto (EST/EDT) UTC-5/-4'},
    {value: 'America/Tortola', label: 'Tortola (AST) UTC-4'},
    {value: 'America/Vancouver', label: 'Vancouver (PST/PDT) UTC-8/-7'},
    {value: 'America/Virgin', label: 'Virgin Islands (AST) UTC-4'},
    {value: 'America/Whitehorse', label: 'Whitehorse (MST) UTC-7'},
    {value: 'America/Winnipeg', label: 'Winnipeg (CST/CDT) UTC-6/-5'},
    {value: 'America/Yakutat', label: 'Yakutat (AKST/AKDT) UTC-9/-8'},
    {value: 'America/Yellowknife', label: 'Yellowknife (MST/MDT) UTC-7/-6'},
    
    // Antarctica
    {value: 'Antarctica/Casey', label: 'Casey (AWST) UTC+8'},
    {value: 'Antarctica/Davis', label: 'Davis (DAVT) UTC+7'},
    {value: 'Antarctica/DumontDUrville', label: 'Dumont d\'Urville (DDUT) UTC+10'},
    {value: 'Antarctica/Macquarie', label: 'Macquarie (MIST/MIDT) UTC+10/+11'},
    {value: 'Antarctica/Mawson', label: 'Mawson (MAWT) UTC+5'},
    {value: 'Antarctica/McMurdo', label: 'McMurdo (NZST/NZDT) UTC+12/+13'},
    {value: 'Antarctica/Palmer', label: 'Palmer (CLT) UTC-3'},
    {value: 'Antarctica/Rothera', label: 'Rothera (ROTT) UTC-3'},
    {value: 'Antarctica/South_Pole', label: 'South Pole (NZST/NZDT) UTC+12/+13'},
    {value: 'Antarctica/Syowa', label: 'Syowa (SYOT) UTC+3'},
    {value: 'Antarctica/Troll', label: 'Troll (CET/CEST) UTC+0/+2'},
    {value: 'Antarctica/Vostok', label: 'Vostok (VOST) UTC+5'},
    
    // Arctic
    {value: 'Arctic/Longyearbyen', label: 'Longyearbyen (CET/CEST) UTC+1/+2'},
    
    // Asia
    {value: 'Asia/Aden', label: 'Aden (AST) UTC+3'},
    {value: 'Asia/Almaty', label: 'Almaty (ALMT) UTC+5'},
    {value: 'Asia/Amman', label: 'Amman (EET) UTC+2'},
    {value: 'Asia/Anadyr', label: 'Anadyr (ANAT) UTC+12'},
    {value: 'Asia/Aqtau', label: 'Aqtau (AQTT) UTC+5'},
    {value: 'Asia/Aqtobe', label: 'Aqtobe (AQTT) UTC+5'},
    {value: 'Asia/Ashgabat', label: 'Ashgabat (TMT) UTC+5'},
    {value: 'Asia/Ashkhabad', label: 'Ashkhabad (TMT) UTC+5'},
    {value: 'Asia/Atyrau', label: 'Atyrau (AQTT) UTC+5'},
    {value: 'Asia/Baghdad', label: 'Baghdad (AST) UTC+3'},
    {value: 'Asia/Bahrain', label: 'Bahrain (AST) UTC+3'},
    {value: 'Asia/Baku', label: 'Baku (AZT) UTC+4'},
    {value: 'Asia/Bangkok', label: 'Bangkok (ICT) UTC+7'},
    {value: 'Asia/Barnaul', label: 'Barnaul (KRAT) UTC+7'},
    {value: 'Asia/Beirut', label: 'Beirut (EET/EEST) UTC+2/+3'},
    {value: 'Asia/Bishkek', label: 'Bishkek (KGT) UTC+6'},
    {value: 'Asia/Brunei', label: 'Brunei (BNT) UTC+8'},
    {value: 'Asia/Calcutta', label: 'Calcutta (IST) UTC+5:30'},
    {value: 'Asia/Chita', label: 'Chita (YAKT) UTC+9'},
    {value: 'Asia/Choibalsan', label: 'Choibalsan (CHOT) UTC+8'},
    {value: 'Asia/Chongqing', label: 'Chongqing (CST) UTC+8'},
    {value: 'Asia/Chungking', label: 'Chungking (CST) UTC+8'},
    {value: 'Asia/Colombo', label: 'Colombo (SLST) UTC+5:30'},
    {value: 'Asia/Dacca', label: 'Dacca (BST) UTC+6'},
    {value: 'Asia/Damascus', label: 'Damascus (EET) UTC+2'},
    {value: 'Asia/Dhaka', label: 'Dhaka (BST) UTC+6'},
    {value: 'Asia/Dili', label: 'Dili (TLT) UTC+9'},
    {value: 'Asia/Dubai', label: 'Dubai (GST) UTC+4'},
    {value: 'Asia/Dushanbe', label: 'Dushanbe (TJT) UTC+5'},
    {value: 'Asia/Famagusta', label: 'Famagusta (EET/EEST) UTC+2/+3'},
    {value: 'Asia/Gaza', label: 'Gaza (EET/EEST) UTC+2/+3'},
    {value: 'Asia/Harbin', label: 'Harbin (CST) UTC+8'},
    {value: 'Asia/Hebron', label: 'Hebron (EET/EEST) UTC+2/+3'},
    {value: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh (ICT) UTC+7'},
    {value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT) UTC+8'},
    {value: 'Asia/Hovd', label: 'Hovd (HOVT) UTC+7'},
    {value: 'Asia/Irkutsk', label: 'Irkutsk (IRKT) UTC+8'},
    {value: 'Asia/Istanbul', label: 'Istanbul (TRT) UTC+3'},
    {value: 'Asia/Jakarta', label: 'Jakarta (WIB) UTC+7'},
    {value: 'Asia/Jayapura', label: 'Jayapura (WIT) UTC+9'},
    {value: 'Asia/Jerusalem', label: 'Jerusalem (IST/IDT) UTC+2/+3'},
    {value: 'Asia/Kabul', label: 'Kabul (AFT) UTC+4:30'},
    {value: 'Asia/Kamchatka', label: 'Kamchatka (PETT) UTC+12'},
    {value: 'Asia/Karachi', label: 'Karachi (PKT) UTC+5'},
    {value: 'Asia/Kashgar', label: 'Kashgar (CST) UTC+6'},
    {value: 'Asia/Kathmandu', label: 'Kathmandu (NPT) UTC+5:45'},
    {value: 'Asia/Katmandu', label: 'Katmandu (NPT) UTC+5:45'},
    {value: 'Asia/Khandyga', label: 'Khandyga (YAKT) UTC+9'},
    {value: 'Asia/Kolkata', label: 'Kolkata (IST) UTC+5:30'},
    {value: 'Asia/Krasnoyarsk', label: 'Krasnoyarsk (KRAT) UTC+7'},
    {value: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur (MYT) UTC+8'},
    {value: 'Asia/Kuching', label: 'Kuching (MYT) UTC+8'},
    {value: 'Asia/Kuwait', label: 'Kuwait (AST) UTC+3'},
    {value: 'Asia/Macao', label: 'Macao (CST) UTC+8'},
    {value: 'Asia/Macau', label: 'Macau (CST) UTC+8'},
    {value: 'Asia/Magadan', label: 'Magadan (MAGT) UTC+11'},
    {value: 'Asia/Makassar', label: 'Makassar (WITA) UTC+8'},
    {value: 'Asia/Manila', label: 'Manila (PHT) UTC+8'},
    {value: 'Asia/Muscat', label: 'Muscat (GST) UTC+4'},
    {value: 'Asia/Nicosia', label: 'Nicosia (EET/EEST) UTC+2/+3'},
    {value: 'Asia/Novokuznetsk', label: 'Novokuznetsk (KRAT) UTC+7'},
    {value: 'Asia/Novosibirsk', label: 'Novosibirsk (NOVT) UTC+7'},
    {value: 'Asia/Omsk', label: 'Omsk (OMST) UTC+6'},
    {value: 'Asia/Oral', label: 'Oral (ORAT) UTC+5'},
    {value: 'Asia/Phnom_Penh', label: 'Phnom Penh (ICT) UTC+7'},
    {value: 'Asia/Pontianak', label: 'Pontianak (WIB) UTC+7'},
    {value: 'Asia/Pyongyang', label: 'Pyongyang (KST) UTC+9'},
    {value: 'Asia/Qatar', label: 'Qatar (AST) UTC+3'},
    {value: 'Asia/Qostanay', label: 'Qostanay (QYZT) UTC+5'},
    {value: 'Asia/Qyzylorda', label: 'Qyzylorda (QYZT) UTC+5'},
    {value: 'Asia/Rangoon', label: 'Rangoon (MMT) UTC+6:30'},
    {value: 'Asia/Riyadh', label: 'Riyadh (AST) UTC+3'},
    {value: 'Asia/Saigon', label: 'Saigon (ICT) UTC+7'},
    {value: 'Asia/Sakhalin', label: 'Sakhalin (SAKT) UTC+11'},
    {value: 'Asia/Samarkand', label: 'Samarkand (UZT) UTC+5'},
    {value: 'Asia/Seoul', label: 'Seoul (KST) UTC+9'},
    {value: 'Asia/Shanghai', label: 'Shanghai (CST) UTC+8'},
    {value: 'Asia/Singapore', label: 'Singapore (SGT) UTC+8'},
    {value: 'Asia/Srednekolymsk', label: 'Srednekolymsk (SRET) UTC+11'},
    {value: 'Asia/Taipei', label: 'Taipei (CST) UTC+8'},
    {value: 'Asia/Tashkent', label: 'Tashkent (UZT) UTC+5'},
    {value: 'Asia/Tbilisi', label: 'Tbilisi (GET) UTC+4'},
    {value: 'Asia/Tehran', label: 'Tehran (IRST) UTC+3:30'},
    {value: 'Asia/Tel_Aviv', label: 'Tel Aviv (IST/IDT) UTC+2/+3'},
    {value: 'Asia/Thimbu', label: 'Thimbu (BTT) UTC+6'},
    {value: 'Asia/Thimphu', label: 'Thimphu (BTT) UTC+6'},
    {value: 'Asia/Tokyo', label: 'Tokyo (JST) UTC+9'},
    {value: 'Asia/Tomsk', label: 'Tomsk (KRAT) UTC+7'},
    {value: 'Asia/Ujung_Pandang', label: 'Ujung Pandang (WITA) UTC+8'},
    {value: 'Asia/Ulaanbaatar', label: 'Ulaanbaatar (ULAT) UTC+8'},
    {value: 'Asia/Ulan_Bator', label: 'Ulan Bator (ULAT) UTC+8'},
    {value: 'Asia/Urumqi', label: 'Urumqi (XJT) UTC+6'},
    {value: 'Asia/Ust-Nera', label: 'Ust-Nera (VLAT) UTC+10'},
    {value: 'Asia/Vientiane', label: 'Vientiane (ICT) UTC+7'},
    {value: 'Asia/Vladivostok', label: 'Vladivostok (VLAT) UTC+10'},
    {value: 'Asia/Yakutsk', label: 'Yakutsk (YAKT) UTC+9'},
    {value: 'Asia/Yangon', label: 'Yangon (MMT) UTC+6:30'},
    {value: 'Asia/Yekaterinburg', label: 'Yekaterinburg (YEKT) UTC+5'},
    {value: 'Asia/Yerevan', label: 'Yerevan (AMT) UTC+4'},
    
    // Atlantic
    {value: 'Atlantic/Azores', label: 'Azores (AZOT/AZOST) UTC-1/+0'},
    {value: 'Atlantic/Bermuda', label: 'Bermuda (AST/ADT) UTC-4/-3'},
    {value: 'Atlantic/Canary', label: 'Canary (WET/WEST) UTC+0/+1'},
    {value: 'Atlantic/Cape_Verde', label: 'Cape Verde (CVT) UTC-1'},
    {value: 'Atlantic/Faeroe', label: 'Faeroe (WET/WEST) UTC+0/+1'},
    {value: 'Atlantic/Faroe', label: 'Faroe (WET/WEST) UTC+0/+1'},
    {value: 'Atlantic/Jan_Mayen', label: 'Jan Mayen (CET/CEST) UTC+1/+2'},
    {value: 'Atlantic/Madeira', label: 'Madeira (WET/WEST) UTC+0/+1'},
    {value: 'Atlantic/Reykjavik', label: 'Reykjavik (GMT) UTC+0'},
    {value: 'Atlantic/South_Georgia', label: 'South Georgia (GST) UTC-2'},
    {value: 'Atlantic/St_Helena', label: 'St Helena (GMT) UTC+0'},
    {value: 'Atlantic/Stanley', label: 'Stanley (FKST) UTC-3'},
    
    // Australia
    {value: 'Australia/ACT', label: 'ACT (AEST/AEDT) UTC+10/+11'},
    {value: 'Australia/Adelaide', label: 'Adelaide (ACST/ACDT) UTC+9:30/+10:30'},
    {value: 'Australia/Brisbane', label: 'Brisbane (AEST) UTC+10'},
    {value: 'Australia/Broken_Hill', label: 'Broken Hill (ACST/ACDT) UTC+9:30/+10:30'},
    {value: 'Australia/Canberra', label: 'Canberra (AEST/AEDT) UTC+10/+11'},
    {value: 'Australia/Currie', label: 'Currie (AEST/AEDT) UTC+10/+11'},
    {value: 'Australia/Darwin', label: 'Darwin (ACST) UTC+9:30'},
    {value: 'Australia/Eucla', label: 'Eucla (ACWST) UTC+8:45'},
    {value: 'Australia/Hobart', label: 'Hobart (AEST/AEDT) UTC+10/+11'},
    {value: 'Australia/LHI', label: 'Lord Howe (LHST/LHDT) UTC+10:30/+11'},
    {value: 'Australia/Lindeman', label: 'Lindeman (AEST) UTC+10'},
    {value: 'Australia/Lord_Howe', label: 'Lord Howe (LHST/LHDT) UTC+10:30/+11'},
    {value: 'Australia/Melbourne', label: 'Melbourne (AEST/AEDT) UTC+10/+11'},
    {value: 'Australia/North', label: 'North (ACST) UTC+9:30'},
    {value: 'Australia/NSW', label: 'NSW (AEST/AEDT) UTC+10/+11'},
    {value: 'Australia/Perth', label: 'Perth (AWST) UTC+8'},
    {value: 'Australia/Queensland', label: 'Queensland (AEST) UTC+10'},
    {value: 'Australia/South', label: 'South (ACST/ACDT) UTC+9:30/+10:30'},
    {value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT) UTC+10/+11'},
    {value: 'Australia/Tasmania', label: 'Tasmania (AEST/AEDT) UTC+10/+11'},
    {value: 'Australia/Victoria', label: 'Victoria (AEST/AEDT) UTC+10/+11'},
    {value: 'Australia/West', label: 'West (AWST) UTC+8'},
    {value: 'Australia/Yancowinna', label: 'Yancowinna (ACST/ACDT) UTC+9:30/+10:30'},
    
    // Pacific
    {value: 'Pacific/Apia', label: 'Apia (WST) UTC+13'},
    {value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT) UTC+12/+13'},
    {value: 'Pacific/Bougainville', label: 'Bougainville (BST) UTC+11'},
    {value: 'Pacific/Chatham', label: 'Chatham (CHAST/CHADT) UTC+12:45/+13:45'},
    {value: 'Pacific/Chuuk', label: 'Chuuk (CHUT) UTC+10'},
    {value: 'Pacific/Easter', label: 'Easter (EAST/EASST) UTC-6/-5'},
    {value: 'Pacific/Efate', label: 'Efate (VUT) UTC+11'},
    {value: 'Pacific/Enderbury', label: 'Enderbury (PHOT) UTC+13'},
    {value: 'Pacific/Fakaofo', label: 'Fakaofo (TKT) UTC+13'},
    {value: 'Pacific/Fiji', label: 'Fiji (FJT) UTC+12'},
    {value: 'Pacific/Funafuti', label: 'Funafuti (TVT) UTC+12'},
    {value: 'Pacific/Galapagos', label: 'Galapagos (GALT) UTC-6'},
    {value: 'Pacific/Gambier', label: 'Gambier (GAMT) UTC-9'},
    {value: 'Pacific/Guadalcanal', label: 'Guadalcanal (SBT) UTC+11'},
    {value: 'Pacific/Guam', label: 'Guam (ChST) UTC+10'},
    {value: 'Pacific/Honolulu', label: 'Honolulu (HST) UTC-10'},
    {value: 'Pacific/Johnston', label: 'Johnston (HST) UTC-10'},
    {value: 'Pacific/Kanton', label: 'Kanton (PHOT) UTC+13'},
    {value: 'Pacific/Kiritimati', label: 'Kiritimati (LINT) UTC+14'},
    {value: 'Pacific/Kosrae', label: 'Kosrae (KOST) UTC+11'},
    {value: 'Pacific/Kwajalein', label: 'Kwajalein (MHT) UTC+12'},
    {value: 'Pacific/Majuro', label: 'Majuro (MHT) UTC+12'},
    {value: 'Pacific/Marquesas', label: 'Marquesas (MART) UTC-9:30'},
    {value: 'Pacific/Midway', label: 'Midway (SST) UTC-11'},
    {value: 'Pacific/Nauru', label: 'Nauru (NRT) UTC+12'},
    {value: 'Pacific/Niue', label: 'Niue (NUT) UTC-11'},
    {value: 'Pacific/Norfolk', label: 'Norfolk (NFT) UTC+11/+12'},
    {value: 'Pacific/Noumea', label: 'Noumea (NCT) UTC+11'},
    {value: 'Pacific/Pago_Pago', label: 'Pago Pago (SST) UTC-11'},
    {value: 'Pacific/Palau', label: 'Palau (PWT) UTC+9'},
    {value: 'Pacific/Pitcairn', label: 'Pitcairn (PST) UTC-8'},
    {value: 'Pacific/Pohnpei', label: 'Pohnpei (PONT) UTC+11'},
    {value: 'Pacific/Ponape', label: 'Ponape (PONT) UTC+11'},
    {value: 'Pacific/Port_Moresby', label: 'Port Moresby (PGT) UTC+10'},
    {value: 'Pacific/Rarotonga', label: 'Rarotonga (CKT) UTC-10'},
    {value: 'Pacific/Saipan', label: 'Saipan (ChST) UTC+10'},
    {value: 'Pacific/Samoa', label: 'Samoa (SST) UTC-11'},
    {value: 'Pacific/Tahiti', label: 'Tahiti (TAHT) UTC-10'},
    {value: 'Pacific/Tarawa', label: 'Tarawa (GILT) UTC+12'},
    {value: 'Pacific/Tongatapu', label: 'Tongatapu (TOT) UTC+13'},
    {value: 'Pacific/Truk', label: 'Truk (CHUT) UTC+10'},
    {value: 'Pacific/Wake', label: 'Wake (WAKT) UTC+12'},
    {value: 'Pacific/Wallis', label: 'Wallis (WFT) UTC+12'},
    {value: 'Pacific/Yap', label: 'Yap (CHUT) UTC+10'}
  ];

  // Helper function to convert UTC offset to timezone string
  const getTimezoneFromOffset = (offset: string) => {
    if (offset.startsWith('UTC')) {
      const offsetValue = offset.replace('UTC', '');
      if (offsetValue === '') return 'UTC';
      
      // Convert UTC+5:30 to Etc/GMT-5:30 format
      const sign = offsetValue.startsWith('+') ? '-' : '+';
      const time = offsetValue.slice(1);
      return `Etc/GMT${sign}${time}`;
    }
    return offset;
  };

  const convertTimezone = (dateTimeValue: string | number, fromTz: string, toTz: string) => {
    if (!dateTimeValue || !fromTz || !toTz) {
      return null;
    }

    try {
      // Create date object from input
      const inputDate = new Date(String(dateTimeValue));
      
      // Validate date
      if (isNaN(inputDate.getTime())) {
        return null;
      }

      // Convert timezone strings if they are UTC offsets
      const fromTimezone = getTimezoneFromOffset(fromTz);
      const toTimezone = getTimezoneFromOffset(toTz);

      // Format the input date for display
      const inputFormatted = inputDate.toLocaleString('en-US', {
        timeZone: fromTimezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });

      // Convert to target timezone
      const converted = new Date(inputDate.toLocaleString('en-US', { timeZone: fromTimezone }));
      const targetFormatted = inputDate.toLocaleString('en-US', {
        timeZone: toTimezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });

      // Calculate time difference in a simpler way
      const fromTime = new Date(inputDate.toLocaleString('en-US', { timeZone: fromTimezone }));
      const toTime = new Date(inputDate.toLocaleString('en-US', { timeZone: toTimezone }));
      const offsetDiff = (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60); // hours

      return {
        value: 1,
        unit: toTz,
        formatted: (
          <div>
            <div className="text-2xl font-bold text-purple-900 mb-4">
              {targetFormatted}
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>{t('result.from')}:</strong> {inputFormatted}</div>
              <div><strong>{t('result.to')}:</strong> {targetFormatted}</div>
              {Math.abs(offsetDiff) > 0 && (
                <div className="text-purple-700 font-medium">
                  {offsetDiff > 0 ? '+' : ''}{Math.round(offsetDiff)} {t('result.hoursDifference')}
                </div>
              )}
            </div>
          </div>
        ),
        title: t('result.title'),
        subtitle: t('result.subtitle')
      };
    } catch (error) {
      return null;
    }
  };

  // Configuration for the calculator
  const config: CalculatorConfig = useMemo(() => ({
    title: t('title'),
    description: t('subtitle'),
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBgColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    
    input1: {
      label: t('form.dateTime'),
      placeholder: t('form.dateTimePlaceholder'),
      value: dateTime,
      type: 'datetime-local',
      onChange: setDateTime
    },
    
    input2: {
      label: '',
      placeholder: '',
      value: '',
      type: 'hidden',
      onChange: () => {},
      hidden: true
    },
    
    calculateButton: {
      text: t('form.convert'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      hoverColor: 'hover:from-blue-700 hover:to-indigo-700',
      focusColor: 'focus:ring-blue-300'
    },
    
    resetButton: {
      text: t('form.reset'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      bgColor: 'bg-gray-100 text-gray-700',
      hoverColor: 'hover:bg-gray-200',
      focusColor: 'focus:ring-gray-300'
    },
    
    shareButton: {
      text: 'Share',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-green-600 to-emerald-600',
      hoverColor: 'hover:from-green-700 hover:to-emerald-700',
      focusColor: 'focus:ring-green-300'
    },
    
    result: {
      title: t('result.title'),
      subtitle: t('result.subtitle'),
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50',
      borderColor: 'border-2 border-blue-200',
      textColor: 'text-blue-900',
      iconBgColor: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    
    calculate: (dateTimeValue: string | number, _unit1: string, _unit2: string | number, _unit3: string) => convertTimezone(dateTimeValue, fromTimezone, toTimezone),
    
    urlParams: {
      enabled: true,
      input1Param: 'dateTime',
      input1UnitParam: 'fromTimezone',
      input2Param: 'toTimezone',
      input2UnitParam: 'toTimezone'
    }
  }), [t, dateTime, fromTimezone, toTimezone]);

  return (
    <div>
      <Calculator2In1Out config={config} />
      
      {/* Timezone Selectors */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Timezone Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              {t('form.fromTimezone')}
            </h3>
            <div className="max-w-md mx-auto">
              <select
                value={fromTimezone}
                onChange={(e) => setFromTimezone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* To Timezone Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              {t('form.toTimezone')}
            </h3>
            <div className="max-w-md mx-auto">
              <select
                value={toTimezone}
                onChange={(e) => setToTimezone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
