import Vue from 'vue';

export const EDIT_HEADER_BUTTON_CLICKED = 'EDIT_BUTTON_CLICKED';

export const DELETE_HEADER_BUTTON_CLICKED = 'DELETE_BUTTON_CLICKED';

export function throwHeaderEditEvent() {
  headerEventBus.$emit(EDIT_HEADER_BUTTON_CLICKED);
}

export function throwHeaderDeleteEvent() {
  headerEventBus.$emit(DELETE_HEADER_BUTTON_CLICKED);
}

export const headerEventBus = new Vue();
