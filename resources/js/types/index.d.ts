import { LucideIcon } from 'lucide-react';
import type { Config as ZiggyConfig } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title:  string;
    href:   string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title:      string;
    href:       string;
    icon?:      LucideIcon | null;
    isActive?:  boolean;
}

export interface SharedData {
    name:           string;
    quote:          { message: string; author: string };
    auth:           Auth;
    ziggy:          ZiggyConfig & { location: string };
    sidebarOpen:    boolean;
    [key: string]:  unknown;
}

interface Multilingual {
    [key: string]: string;
}

export interface User {
    id:                 number;
    firstname:          string;
    lastname:           string;
    email:              string;
    birthday:           Date;
    tel:                string;
    avatar?:            string;
    email_verified_at:  string | null;
    created_at:         string;
    updated_at:         string;
    [key: string]:      unknown; // This allows for additional properties...
}

export interface Study {
    id:             number;
    start:          Date;
    end:            Date | null;
    name:           Multilingual;
    school:         string;
    full_name:      string;
    obtained:       boolean;
    mention:        'assez_bien' | 'bien' | 'tres_bien' | null;
    created_at:     string;
    updated_at:     string;
    [key: string]:  unknown;
}

export interface Language {
    id:             number;
    name:           Multilingual;
    level:          'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    created_at:     string;
    updated_at:     string;
    [key: string]:  unknown;
}

export interface Interest {
    id:             number;
    emoji:          string;
    name:           Multilingual;
    created_at:     string;
    updated_at:     string;
    [key: string]:  unknown;
}

export interface Config {
    id:                 number;
    job:                Multilingual;
    description:        Multilingual;
    dark_background:    string;
    dark_primary:       string;
    dark_secondary:     string;
    light_background:   string;
    light_primary:      string;
    light_secondary:    string;
    created_at:         string;
    updated_at:         string;
    [key: string]:      unknown;
}

export interface Link {
    id:             number;
    name:           'GitHub' | 'GitLab' | 'LinkedIn';
    url:            string;
    svg:            string;
    created_at:     string;
    updated_at:     string;
    [key: string]:  unknown;
}

export interface Technology {
    id:             number;
    name:           Multilingual;
    type:           'Backend' | 'Frontend' | 'Mobile' | 'Database';
    created_at:     string;
    updated_at:     string;
    [key: string]:  unknown;
}

export interface Project {
    id:                 number;
    title:              Multilingual;
    description_short:  Multilingual;
    description_long:   Multilingual;
    url:                string | null;
    side:               boolean;
    in_progress:        boolean;
    created_at:         string;
    updated_at:         string;
    [key: string]:      unknown;
}

export interface Achivement {
    id:             number;
    name:           Multilingual;
    created_at:     string;
    updated_at:     string;
    [key: string]:  unknown;
}

export interface Skill {
    id:             number;
    svg:            string;
    name:           Multilingual;
    created_at:     string;
    updated_at:     string;
    [key: string]:  unknown;
}

export interface Experience {
    id:             number;
    start:          Date;
    end:            Date | null;
    job:            Multilingual;
    description:    Multilingual;
    contract:       'CDD' | 'CDI' | 'Alternance' | 'Auto Entrepreneur';
    created_at:     string;
    updated_at:     string;
    [key: string]:  unknown;
}
