/* @ds-bundle: {"format":4,"namespace":"HPCTeacherAppDesignSystem_97fd44","components":[{"name":"ChartAccordion","sourcePath":"components/accordions/ChartAccordion.jsx"},{"name":"HealthAccordion","sourcePath":"components/accordions/HealthAccordion.jsx"},{"name":"InfoAccordion","sourcePath":"components/accordions/InfoAccordion.jsx"},{"name":"ListAccordion","sourcePath":"components/accordions/ListAccordion.jsx"},{"name":"PendingAccordion","sourcePath":"components/accordions/PendingAccordion.jsx"},{"name":"BottomNavBar","sourcePath":"components/actions/BottomNavBar.jsx"},{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Button2","sourcePath":"components/actions/Button2.jsx"},{"name":"CaretRight","sourcePath":"components/actions/CaretRight.jsx"},{"name":"NavButton","sourcePath":"components/actions/NavButton.jsx"},{"name":"Notes","sourcePath":"components/annotation/Notes.jsx"},{"name":"BGFrame","sourcePath":"components/device/BGFrame.jsx"},{"name":"GestureBar","sourcePath":"components/device/GestureBar.jsx"},{"name":"StatusBar","sourcePath":"components/device/StatusBar.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"BadgeAccentTag","sourcePath":"components/display/BadgeAccentTag.jsx"},{"name":"Separator","sourcePath":"components/display/Separator.jsx"},{"name":"SpeedWidgets","sourcePath":"components/display/SpeedWidgets.jsx"},{"name":"StudentOverviewCard","sourcePath":"components/display/StudentOverviewCard.jsx"},{"name":"WorkoutTime","sourcePath":"components/display/WorkoutTime.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"InfoField","sourcePath":"components/forms/InfoField.jsx"},{"name":"Label","sourcePath":"components/forms/Label.jsx"},{"name":"RadioButton","sourcePath":"components/forms/RadioButton.jsx"},{"name":"RadioButtonIcon","sourcePath":"components/forms/RadioButtonIcon.jsx"},{"name":"BarChart07","sourcePath":"components/glyphs/BarChart07.jsx"},{"name":"Briefcase02","sourcePath":"components/glyphs/Briefcase02.jsx"},{"name":"ChevronDown","sourcePath":"components/glyphs/ChevronDown.jsx"},{"name":"ChevronDownFilled","sourcePath":"components/glyphs/ChevronDownFilled.jsx"},{"name":"ChevronUp","sourcePath":"components/glyphs/ChevronUp.jsx"},{"name":"Circle","sourcePath":"components/glyphs/Circle.jsx"},{"name":"Circle2","sourcePath":"components/glyphs/Circle2.jsx"},{"name":"HelpCircle","sourcePath":"components/glyphs/HelpCircle.jsx"},{"name":"HxHome02","sourcePath":"components/glyphs/HxHome02.jsx"},{"name":"HxTrendUp01Filled","sourcePath":"components/glyphs/HxTrendUp01Filled.jsx"},{"name":"IconCheck","sourcePath":"components/glyphs/IconCheck.jsx"},{"name":"Mail01","sourcePath":"components/glyphs/Mail01.jsx"},{"name":"Minus","sourcePath":"components/glyphs/Minus.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"}],"sourceHashes":{"components/accordions/ChartAccordion.jsx":"1c5a77985dea","components/accordions/HealthAccordion.jsx":"02fbb192adfa","components/accordions/InfoAccordion.jsx":"db8f81e8b6a4","components/accordions/ListAccordion.jsx":"b96436248134","components/accordions/PendingAccordion.jsx":"96d36677ff95","components/actions/BottomNavBar.jsx":"8f187f738d59","components/actions/Button.jsx":"b084289332b4","components/actions/Button2.jsx":"caef1766a592","components/actions/CaretRight.jsx":"c52aae3ee717","components/actions/NavButton.jsx":"08f5b91bd319","components/annotation/Notes.jsx":"d3b130b9fb1b","components/device/BGFrame.jsx":"14b3c8d289b3","components/device/GestureBar.jsx":"3ee90a080c2d","components/device/StatusBar.jsx":"e7d88d8a7c55","components/display/Avatar.jsx":"76eb6890b41e","components/display/BadgeAccentTag.jsx":"de7ca713dfef","components/display/Separator.jsx":"aba9f1441e8b","components/display/SpeedWidgets.jsx":"0fce77cda329","components/display/StudentOverviewCard.jsx":"046b0e4a5796","components/display/WorkoutTime.jsx":"cb99855cd13b","components/forms/Checkbox.jsx":"c3121134d180","components/forms/Field.jsx":"8f76e4a3e1ca","components/forms/InfoField.jsx":"68b0d3f0f97a","components/forms/Label.jsx":"dce0e686725f","components/forms/RadioButton.jsx":"691e6e3d1d40","components/forms/RadioButtonIcon.jsx":"3d176fab630e","components/glyphs/BarChart07.jsx":"7ee2604f719d","components/glyphs/Briefcase02.jsx":"4d2011d19412","components/glyphs/ChevronDown.jsx":"6ca6414a5d9a","components/glyphs/ChevronDownFilled.jsx":"c79dc3ce968e","components/glyphs/ChevronUp.jsx":"e07e066b3e15","components/glyphs/Circle.jsx":"9f61a03878d8","components/glyphs/Circle2.jsx":"c2a2af3e0068","components/glyphs/HelpCircle.jsx":"89f8f0c3a7c9","components/glyphs/HxHome02.jsx":"50a1856f843e","components/glyphs/HxTrendUp01Filled.jsx":"59bc26e46e90","components/glyphs/IconCheck.jsx":"287b26344bee","components/glyphs/Mail01.jsx":"ca1f4e5e476c","components/glyphs/Minus.jsx":"4bb17db3855d","components/icons/Icon.jsx":"b81dfc2559d3","components/icons/icon-data.js":"39b8ae3705ed","ui_kits/teacher-app/Activity.jsx":"4f884137728b","ui_kits/teacher-app/Home.jsx":"745abfbf6026","ui_kits/teacher-app/Shell.jsx":"1d50bef85237","ui_kits/teacher-app/SignIn.jsx":"a0cb93ea03df","ui_kits/teacher-app/Students.jsx":"e9d457141247"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HPCTeacherAppDesignSystem_97fd44 = window.HPCTeacherAppDesignSystem_97fd44 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/CaretRight.jsx
try { (() => {
// figma node: 173:1519 CaretRight (3 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "format=" + __venc(p.format) + '|' + "weight=" + __venc(p.weight);
function CaretRight(_p = {}) {
  const props = {
    ..._p,
    format: _p.format ?? "outline",
    weight: _p.weight ?? "bold"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      position: "relative",
      color: "inherit",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 9.001,
    height: 16.501,
    viewBox: "0 0 9.001 16.501",
    fill: "none",
    style: {
      position: "absolute",
      left: 8.25,
      top: 3.75,
      width: 9.001,
      height: 16.501
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.781 8.781 L 1.281 16.281 C 1.211 16.351 1.129 16.406 1.038 16.444 C 0.947 16.481 0.849 16.501 0.75 16.501 C 0.652 16.501 0.554 16.481 0.463 16.444 C 0.372 16.406 0.289 16.351 0.22 16.281 C 0.15 16.211 0.095 16.129 0.057 16.038 C 0.019 15.947 0 15.849 0 15.75 C 0 15.652 0.019 15.554 0.057 15.463 C 0.095 15.372 0.15 15.289 0.22 15.22 L 7.19 8.25 L 0.22 1.281 C 0.079 1.14 0 0.949 0 0.75 C 0 0.551 0.079 0.361 0.22 0.22 C 0.361 0.079 0.551 0 0.75 0 C 0.949 0 1.14 0.079 1.281 0.22 L 8.781 7.72 C 8.851 7.789 8.906 7.872 8.944 7.963 C 8.982 8.054 9.001 8.152 9.001 8.25 C 9.001 8.349 8.982 8.447 8.944 8.538 C 8.906 8.629 8.851 8.711 8.781 8.781 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      position: "relative",
      color: "inherit",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 9.756,
    height: 17.254,
    viewBox: "0 0 9.756 17.254",
    fill: "none",
    style: {
      position: "absolute",
      left: 7.872,
      top: 3.372,
      width: 9.756,
      height: 17.254
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.424 9.424 L 1.924 16.924 C 1.712 17.135 1.426 17.254 1.127 17.254 C 0.828 17.254 0.541 17.135 0.33 16.924 C 0.119 16.712 0 16.426 0 16.127 C 0 15.828 0.119 15.541 0.33 15.33 L 7.034 8.628 L 0.332 1.924 C 0.227 1.819 0.144 1.695 0.088 1.558 C 0.031 1.421 0.002 1.275 0.002 1.127 C 0.002 0.979 0.031 0.832 0.088 0.696 C 0.144 0.559 0.227 0.435 0.332 0.33 C 0.437 0.225 0.561 0.142 0.698 0.086 C 0.834 0.029 0.981 0 1.129 0 C 1.277 0 1.423 0.029 1.56 0.086 C 1.697 0.142 1.821 0.225 1.926 0.33 L 9.426 7.83 C 9.53 7.935 9.614 8.059 9.67 8.196 C 9.727 8.333 9.756 8.479 9.756 8.627 C 9.755 8.775 9.726 8.922 9.669 9.059 C 9.612 9.195 9.529 9.319 9.424 9.424 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
  const __body2 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      position: "relative",
      color: "inherit",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 9.001,
    height: 16.501,
    viewBox: "0 0 9.001 16.501",
    fill: "none",
    style: {
      position: "absolute",
      left: 8.25,
      top: 3.749,
      width: 9.001,
      height: 16.501
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.781 8.781 L 1.281 16.281 C 1.176 16.386 1.042 16.458 0.896 16.487 C 0.751 16.516 0.6 16.501 0.463 16.444 C 0.326 16.387 0.209 16.291 0.126 16.168 C 0.044 16.044 0 15.899 0 15.751 L 0 0.751 C 0 0.602 0.044 0.457 0.126 0.334 C 0.209 0.21 0.326 0.114 0.463 0.057 C 0.6 0 0.751 -0.015 0.896 0.014 C 1.042 0.043 1.176 0.115 1.281 0.22 L 8.781 7.72 C 8.85 7.79 8.906 7.872 8.943 7.963 C 8.981 8.054 9.001 8.152 9.001 8.251 C 9.001 8.349 8.981 8.447 8.943 8.538 C 8.906 8.629 8.85 8.712 8.781 8.781 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
  const __impls = {
    // figma: Format=Outline, Weight=Regular
    "format=outline|weight=regular": __body0,
    // figma: Format=Outline, Weight=Bold
    "format=outline|weight=bold": __body1,
    // figma: Format=Outline, Weight=Fill
    "format=outline|weight=fill": __body2
  };
  return (__impls[__vkey(props)] ?? __body1)();
}
Object.assign(__ds_scope, { CaretRight, __ds_default_components_actions_CaretRight_hgqnyf: CaretRight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/CaretRight.jsx", error: String((e && e.message) || e) }); }

// components/device/BGFrame.jsx
try { (() => {
// figma node: 1:328 BG Frame
function BGFrame(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 412,
      height: 917,
      overflow: "hidden",
      position: "relative",
      ...props.style
    }
  });
}
Object.assign(__ds_scope, { BGFrame, __ds_default_components_device_BGFrame_11b16wd: BGFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/device/BGFrame.jsx", error: String((e && e.message) || e) }); }

// components/device/GestureBar.jsx
try { (() => {
// figma node: 1:325 .Gesture bar
function GestureBar(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 412,
      height: 24,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 152,
      top: 10,
      width: 108,
      height: 4,
      borderRadius: 9999,
      backgroundColor: "var(--icon-default)"
    }
  }));
}
Object.assign(__ds_scope, { GestureBar, __ds_default_components_device_GestureBar_1cltfvx: GestureBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/device/GestureBar.jsx", error: String((e && e.message) || e) }); }

// components/device/StatusBar.jsx
try { (() => {
// figma node: 1:332 Status bar
function StatusBar(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 412,
      height: 52,
      display: "flex",
      flexDirection: "row",
      padding: "10px 24px 10px 24px",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      letterSpacing: "0.010em",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text1 ?? "9:30"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 46,
      height: 17,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 17,
      height: 17,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 17,
    height: 17,
    viewBox: "0 0 17 17",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 17,
      height: 17
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0 L 17 0 L 17 17 L 0 17 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 17,
      height: 17
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: 17,
    height: 17,
    viewBox: "0 0 17 17",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 17,
      height: 17
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0 L 17 0 L 17 17 L 0 17 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 17,
    height: 14.167,
    viewBox: "0 0 17 14.167",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 1.417,
      width: 17,
      height: 14.167,
      opacity: 0.1,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.5 0 C 5.1 0 2.125 1.487 0 3.825 L 8.5 14.167 L 17 3.825 C 14.875 1.487 11.9 0 8.5 0 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      top: 0,
      width: 17,
      height: 17,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 17,
    height: 17,
    viewBox: "0 0 17 17",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 17,
      height: 17
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0 L 17 0 L 17 17 L 0 17 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 14.167,
    height: 14.167,
    viewBox: "0 0 14.167 14.167",
    fill: "none",
    style: {
      position: "absolute",
      left: 1.417,
      top: 1.417,
      width: 14.167,
      height: 14.167,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 14.167 0 L 0 14.167 L 14.167 14.167 L 14.167 0 L 14.167 0 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 38,
      top: 1,
      width: 8,
      height: 15
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 8,
    height: 15,
    viewBox: "0 0 8 15",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 8,
      height: 15,
      opacity: 0.3,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.5 0 L 5.5 0 M 2.5 1.5 L 2.5 0 M 1 1.5 L 2.5 1.5 M 0 2.625 C 0 2.004 0.448 1.5 1 1.5 M 0 13.875 L 0 2.625 M 1 15 C 0.448 15 0 14.496 0 13.875 M 7 15 L 1 15 M 8 13.875 C 8 14.496 7.552 15 7 15 M 8 2.625 L 8 13.875 M 7 1.5 C 7.552 1.5 8 2.004 8 2.625 M 5.5 1.5 L 7 1.5 M 5.5 0 L 5.5 1.5 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 8,
    height: 7,
    viewBox: "0 0 8 7",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 8,
      width: 8,
      height: 7,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 5.95 C 0 5.367 0 0.583 0 0 M 1 7 C 0.448 7 0 6.53 0 5.95 M 7 7 L 1 7 M 8 5.95 C 8 6.53 7.552 7 7 7 M 8 0 C 8 0.583 8 5.367 8 5.95 M 0 0 L 8 0 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })))), /*#__PURE__*/React.createElement("svg", {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      position: "absolute",
      left: 194,
      top: 9,
      width: 24,
      height: 24,
      color: "var(--icon-default)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 12 0 C 5.373 0 0 5.373 0 12 C 0 18.627 5.373 24 12 24 C 18.627 24 24 18.627 24 12 C 24 5.373 18.627 0 12 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { StatusBar, __ds_default_components_device_StatusBar_q0mb6a: StatusBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/device/StatusBar.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
// figma node: 173:1493 Avatar (2 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "type=" + __venc(p.type);
function Avatar(_p = {}) {
  const props = {
    ..._p,
    initials: _p.initials ?? "OM",
    type: _p.type ?? "avatar image"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 40,
      height: 40,
      borderRadius: 9999,
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-85fdd552c7a66044-e987de0c",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 40,
      height: 40,
      borderRadius: "50%"
    }
  }));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 40,
      height: 40,
      borderRadius: 9999,
      backgroundColor: "var(--muted)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 8,
      top: 8,
      width: 27,
      height: 24,
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-muted)"
    }
  }, props.initials));
  const __impls = {
    // figma: type=avatar image
    "type=avatar image": __body0,
    // figma: type=avatar initials
    "type=avatar initials": __body1
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
Object.assign(__ds_scope, { Avatar, __ds_default_components_display_Avatar_1dmo83i: Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/BadgeAccentTag.jsx
try { (() => {
// figma node: 173:1483 Badge / Accent Tag (9 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "colour=" + __venc(p.colour) + '|' + "type=" + __venc(p.type);
function BadgeAccentTag(_p = {}) {
  const props = {
    ..._p,
    colour: _p.colour ?? "neutral",
    type: _p.type ?? "default"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--surface-accent-red)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-accent-red)",
      flexShrink: 0
    }
  }, props.text1 ?? "Badge"));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--surface-tertiary)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text1 ?? "Badge"));
  const __body2 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--surface-accent-green)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-accent-green)",
      flexShrink: 0
    }
  }, props.text1 ?? "Badge"));
  const __body3 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--surface-accent-orange)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-accent-orange)",
      flexShrink: 0
    }
  }, props.text1 ?? "Badge"));
  const __body4 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--surface-accent-purple)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-accent-purple)",
      flexShrink: 0
    }
  }, props.text1 ?? "Badge"));
  const __body5 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--surface-accent-pink)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-accent-pink)",
      flexShrink: 0
    }
  }, props.text1 ?? "Badge"));
  const __body6 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--surface-accent-indigo)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-accent-indigo)",
      flexShrink: 0
    }
  }, props.text1 ?? "Badge"));
  const __body7 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--surface-accent-violet)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-accent-violet)",
      flexShrink: 0
    }
  }, props.text1 ?? "Badge"));
  const __body8 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--surface-accent-sky)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-accent-blue)",
      flexShrink: 0
    }
  }, props.text1 ?? "Badge"));
  const __impls = {
    // figma: Colour=Error, Type=Default
    "colour=error|type=default": __body0,
    // figma: Colour=Neutral, Type=Default
    "colour=neutral|type=default": __body1,
    // figma: Colour=Success, Type=Default
    "colour=success|type=default": __body2,
    // figma: Colour=Warning, Type=Default
    "colour=warning|type=default": __body3,
    // figma: Colour=Purple, Type=Default
    "colour=purple|type=default": __body4,
    // figma: Colour=Pink, Type=Default
    "colour=pink|type=default": __body5,
    // figma: Colour=Indigo, Type=Default
    "colour=indigo|type=default": __body6,
    // figma: Colour=Violet, Type=Default
    "colour=violet|type=default": __body7,
    // figma: Colour=Blue, Type=Default
    "colour=blue|type=default": __body8
  };
  return (__impls[__vkey(props)] ?? __body1)();
}
Object.assign(__ds_scope, { BadgeAccentTag, __ds_default_components_display_BadgeAccentTag_1x4a7zw: BadgeAccentTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/BadgeAccentTag.jsx", error: String((e && e.message) || e) }); }

// components/display/Separator.jsx
try { (() => {
// figma node: 173:1527 Separator (1 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "type=" + __venc(p.type);
function Separator(_p = {}) {
  const props = {
    ..._p,
    type: _p.type ?? "default"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 236,
      height: 0,
      position: "relative",
      color: "var(--border-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 236,
    height: 1,
    viewBox: "0 -0.500 236 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 236,
      height: 1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 236 0 L 236 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 236 0.5 L 236 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
  const __impls = {
    // figma: Type=Default
    "type=default": __body0
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
Object.assign(__ds_scope, { Separator, __ds_default_components_display_Separator_k2r574: Separator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Separator.jsx", error: String((e && e.message) || e) }); }

// components/display/StudentOverviewCard.jsx
try { (() => {
// figma node: 173:1531 Student Overview card (1 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "property1=" + __venc(p.property1);
function StudentOverviewCard(_p = {}) {
  const props = {
    ..._p,
    showDetails: _p.showDetails ?? true,
    property1: _p.property1 ?? "1",
    showPendingBadge: _p.showPendingBadge ?? false,
    showCompletedBadge: _p.showCompletedBadge ?? false
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 381,
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 0.400px var(--border-light), 0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: "12px 12px 12px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 11,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 40,
      height: 40,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    type: "avatar image"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 44,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text1 ?? "Om Kumar"), props.showPendingBadge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 20,
      flexShrink: 0
    }
  }, props.icon2 ?? /*#__PURE__*/React.createElement(__ds_scope.BadgeAccentTag, {
    text1: "Pending",
    colour: "error",
    type: "default"
  })), props.showCompletedBadge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 20,
      width: 68,
      flexShrink: 0
    }
  }, props.icon3 ?? /*#__PURE__*/React.createElement(__ds_scope.BadgeAccentTag, {
    text1: "Completed",
    colour: "success",
    type: "default"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, props.text2 ?? "Roll No. : 123345")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 21.6,
      height: 21.6,
      flexShrink: 0
    }
  }, props.icon4 ?? /*#__PURE__*/React.createElement(__ds_scope.CaretRight, {
    format: "outline",
    weight: "regular",
    style: {
      transform: "scale(0.900, 0.900)",
      transformOrigin: "0 0"
    }
  }))), props.showDetails && /*#__PURE__*/React.createElement(__ds_scope.Separator, {
    style: {
      position: "relative",
      height: 0,
      flexShrink: 0,
      alignSelf: "stretch",
      width: "auto"
    },
    type: "default"
  }), props.showDetails && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      lineHeight: "12px",
      color: "var(--text-muted)",
      flexShrink: 0,
      whiteSpace: "nowrap"
    }
  }, props.text3 ?? "Health & Well Being"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-success)",
      flexShrink: 0,
      alignSelf: "stretch",
      whiteSpace: "nowrap"
    }
  }, props.text4 ?? "Good")), /*#__PURE__*/React.createElement(__ds_scope.Separator, {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 44,
      height: 0,
      transform: "matrix(0,1,-1,0,125.550,0)",
      transformOrigin: "0 0"
    },
    type: "default"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      lineHeight: "12px",
      color: "var(--text-muted)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, "Attendance"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-success)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, "95%")), /*#__PURE__*/React.createElement(__ds_scope.Separator, {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 44,
      height: 0,
      transform: "matrix(0,1,-1,0,230.650,0)",
      transformOrigin: "0 0"
    },
    type: "default"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: 100,
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      lineHeight: "12px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, "Academic Performance"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-success)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, "Excellent"))));
  const __impls = {
    // figma: Property 1=1
    "property1=1": __body0
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
Object.assign(__ds_scope, { StudentOverviewCard, __ds_default_components_display_StudentOverviewCard_bd98ev: StudentOverviewCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/StudentOverviewCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/InfoField.jsx
try { (() => {
// figma node: 173:4472 Info Field
function InfoField(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 136,
      display: "flex",
      flexDirection: "column",
      gap: 3,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "rgb(51,65,85)",
      flexShrink: 0
    }
  }, "Label"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 14.667,
    height: 14.667,
    viewBox: "0 0 14.667 14.667",
    fill: "none",
    style: {
      position: "absolute",
      left: 0.667,
      top: 0.667,
      width: 14.667,
      height: 14.667,
      color: "rgb(15,23,42)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.333 1.333 C 4.02 1.333 1.333 4.02 1.333 7.333 C 1.333 10.647 4.02 13.333 7.333 13.333 C 10.647 13.333 13.333 10.647 13.333 7.333 C 13.333 4.02 10.647 1.333 7.333 1.333 Z M 0 7.333 C 0 3.283 3.283 0 7.333 0 C 11.383 0 14.667 3.283 14.667 7.333 C 14.667 11.383 11.383 14.667 7.333 14.667 C 3.283 14.667 0 11.383 0 7.333 Z M 7.505 4.683 C 7.195 4.63 6.876 4.688 6.604 4.848 C 6.333 5.007 6.127 5.258 6.022 5.555 C 5.9 5.902 5.519 6.084 5.172 5.962 C 4.825 5.84 4.642 5.459 4.764 5.112 C 4.973 4.518 5.386 4.017 5.929 3.698 C 6.472 3.379 7.11 3.262 7.731 3.369 C 8.352 3.475 8.915 3.798 9.32 4.28 C 9.726 4.761 9.948 5.371 9.947 6.001 C 9.946 7.021 9.19 7.695 8.65 8.055 C 8.359 8.248 8.074 8.391 7.863 8.484 C 7.757 8.531 7.668 8.567 7.603 8.592 C 7.571 8.604 7.545 8.614 7.526 8.62 L 7.503 8.628 L 7.495 8.631 L 7.493 8.632 L 7.492 8.632 C 7.491 8.632 7.491 8.632 7.28 8 L 7.491 8.632 C 7.142 8.749 6.764 8.56 6.648 8.211 C 6.531 7.862 6.72 7.484 7.069 7.368 L 7.079 7.364 C 7.089 7.36 7.106 7.354 7.129 7.346 C 7.174 7.329 7.24 7.302 7.322 7.266 C 7.486 7.193 7.701 7.085 7.91 6.945 C 8.37 6.639 8.613 6.313 8.613 6 L 8.613 5.999 C 8.614 5.684 8.503 5.379 8.3 5.138 C 8.097 4.897 7.816 4.736 7.505 4.683 Z M 6.667 10.667 C 6.667 10.298 6.965 10 7.333 10 L 7.34 10 C 7.708 10 8.007 10.298 8.007 10.667 C 8.007 11.035 7.708 11.333 7.34 11.333 L 7.333 11.333 C 6.965 11.333 6.667 11.035 6.667 10.667 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: "24px",
      color: "var(--text-body)",
      flexShrink: 0,
      alignSelf: "stretch",
      whiteSpace: "nowrap"
    }
  }, props.text1 ?? "Text"));
}
Object.assign(__ds_scope, { InfoField, __ds_default_components_forms_InfoField_3jhvsw: InfoField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/InfoField.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioButtonIcon.jsx
try { (() => {
// figma node: 234:3061 .Radio Button Icon (10 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "selected=" + __venc(p.selected) + '|' + "state=" + __venc(p.state) + '|' + "disabled=" + __venc(p.disabled);
function RadioButtonIcon(_p = {}) {
  const props = {
    ..._p,
    selected: _p.selected ?? true,
    state: _p.state ?? "default",
    disabled: _p.disabled ?? false
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      opacity: 0.5,
      borderRadius: 9999,
      backgroundColor: "var(--surface-disabled-3)",
      borderTop: "1px solid var(--border-disabled-2)",
      borderRight: "1px solid var(--border-disabled-2)",
      borderBottom: "1px solid var(--border-disabled-2)",
      borderLeft: "1px solid var(--border-disabled-2)",
      position: "relative",
      ...props.style
    }
  });
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 9999,
      backgroundColor: "var(--surface-error-2)",
      borderTop: "1px solid var(--border-error-2)",
      borderRight: "1px solid var(--border-error-2)",
      borderBottom: "1px solid var(--border-error-2)",
      borderLeft: "1px solid var(--border-error-2)",
      position: "relative",
      ...props.style
    }
  });
  const __body2 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 9999,
      backgroundColor: "var(--surface-disabled-3)",
      borderTop: "1px solid var(--border-disabled-2)",
      borderRight: "1px solid var(--border-disabled-2)",
      borderBottom: "1px solid var(--border-disabled-2)",
      borderLeft: "1px solid var(--border-disabled-2)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 4,
      top: 4,
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "var(--icon-disabled-2)"
    }
  }));
  const __body3 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 9999,
      borderTop: "1px solid var(--border-default-3)",
      borderRight: "1px solid var(--border-default-3)",
      borderBottom: "1px solid var(--border-default-3)",
      borderLeft: "1px solid var(--border-default-3)",
      position: "relative",
      ...props.style
    }
  });
  const __body4 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 9999,
      borderTop: "1px solid var(--border-primary-3)",
      borderRight: "1px solid var(--border-primary-3)",
      borderBottom: "1px solid var(--border-primary-3)",
      borderLeft: "1px solid var(--border-primary-3)",
      position: "relative",
      ...props.style
    }
  });
  const __body5 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 9999,
      borderTop: "1px solid var(--border-default-3)",
      borderRight: "1px solid var(--border-default-3)",
      borderBottom: "1px solid var(--border-default-3)",
      borderLeft: "1px solid var(--border-default-3)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 20,
      height: 20,
      borderRadius: 9999,
      boxShadow: "inset 0 0 0 1px var(--border-focus-3)"
    }
  }));
  const __body6 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 9999,
      borderTop: "1px solid var(--border-default-3)",
      borderRight: "1px solid var(--border-default-3)",
      borderBottom: "1px solid var(--border-default-3)",
      borderLeft: "1px solid var(--border-default-3)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 4,
      top: 4,
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "var(--icon-default-3)"
    }
  }));
  const __body7 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 9999,
      borderTop: "1px solid var(--border-primary-3)",
      borderRight: "1px solid var(--border-primary-3)",
      borderBottom: "1px solid var(--border-primary-3)",
      borderLeft: "1px solid var(--border-primary-3)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 4,
      top: 4,
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "var(--text-default)"
    }
  }));
  const __body8 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 9999,
      borderTop: "1px solid var(--border-default-3)",
      borderRight: "1px solid var(--border-default-3)",
      borderBottom: "1px solid var(--border-default-3)",
      borderLeft: "1px solid var(--border-default-3)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 4,
      top: 4,
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "var(--icon-default-3)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 20,
      height: 20,
      borderRadius: 9999,
      boxShadow: "inset 0 0 0 1px var(--border-focus-3)"
    }
  }));
  const __body9 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 9999,
      backgroundColor: "var(--surface-error-2)",
      borderTop: "1px solid var(--border-error-2)",
      borderRight: "1px solid var(--border-error-2)",
      borderBottom: "1px solid var(--border-error-2)",
      borderLeft: "1px solid var(--border-error-2)",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 4,
      top: 4,
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "var(--icon-error-2)"
    }
  }));
  const __impls = {
    // figma: Selected=False, State=Default, Disabled=True
    "selected=false|state=default|disabled=true": __body0,
    // figma: Selected=False, State=Error, Disabled=False
    "selected=false|state=error|disabled=false": __body1,
    // figma: Selected=True, State=Default, Disabled=True
    "selected=true|state=default|disabled=true": __body2,
    // figma: Selected=False, State=Default, Disabled=False
    "selected=false|state=default|disabled=false": __body3,
    // figma: Selected=False, State=Hover, Disabled=False
    "selected=false|state=hover|disabled=false": __body4,
    // figma: Selected=False, State=Focus, Disabled=False
    "selected=false|state=focus|disabled=false": __body5,
    // figma: Selected=True, State=Default, Disabled=False
    "selected=true|state=default|disabled=false": __body6,
    // figma: Selected=True, State=Hover, Disabled=False
    "selected=true|state=hover|disabled=false": __body7,
    // figma: Selected=True, State=Focus, Disabled=False
    "selected=true|state=focus|disabled=false": __body8,
    // figma: Selected=True, State=Error, Disabled=False
    "selected=true|state=error|disabled=false": __body9
  };
  return (__impls[__vkey(props)] ?? __body6)();
}
Object.assign(__ds_scope, { RadioButtonIcon, __ds_default_components_forms_RadioButtonIcon_n612hw: RadioButtonIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioButtonIcon.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioButton.jsx
try { (() => {
// figma node: 234:3005 Radio Button (2 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "muted=" + __venc(p.muted);
function RadioButton(_p = {}) {
  const props = {
    ..._p,
    muted: _p.muted ?? false
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.RadioButtonIcon, {
    selected: true,
    state: "default",
    disabled: false
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-3)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.text1 ?? "Radio Button Item"));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.RadioButtonIcon, {
    selected: true,
    state: "default",
    disabled: false
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted-3)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.text1 ?? "Radio Button Item"));
  const __impls = {
    // figma: Muted=False
    "muted=false": __body0,
    // figma: Muted=True
    "muted=true": __body1
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
Object.assign(__ds_scope, { RadioButton, __ds_default_components_forms_RadioButton_m2ggyj: RadioButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioButton.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/BarChart07.jsx
try { (() => {
// figma node: 173:3503 bar-chart-07
function BarChart07(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--icon-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
    fill: "none",
    style: {
      position: "absolute",
      left: 2,
      top: 2,
      width: 20,
      height: 20
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2 1 C 2 0.448 1.552 0 1 0 M 2 15.8 L 2 1 M 2.024 17.032 C 2.001 16.749 2 16.377 2 15.8 M 2.109 17.454 C 2.084 17.405 2.046 17.304 2.024 17.032 M 2.546 17.891 C 2.358 17.795 2.205 17.642 2.109 17.454 M 2.968 17.976 C 2.696 17.954 2.595 17.916 2.546 17.891 M 4.2 18 C 3.623 18 3.251 17.999 2.968 17.976 M 19 18 L 4.2 18 M 20 19 C 20 18.448 19.552 18 19 18 M 19 20 C 19.552 20 20 19.552 20 19 M 4.161 20 L 19 20 M 2.805 19.969 C 3.18 20 3.634 20 4.161 20 M 1.638 19.673 C 2.016 19.866 2.41 19.937 2.805 19.969 M 0.327 18.362 C 0.615 18.926 1.074 19.385 1.638 19.673 M 0.031 17.195 C 0.063 17.59 0.134 17.984 0.327 18.362 M 0 15.839 C 0 16.366 0 16.82 0.031 17.195 M 0 1 L 0 15.839 M 1 0 C 0.448 0 0 0.448 0 1 Z M 10.5 3.5 C 10.5 2.948 10.052 2.5 9.5 2.5 M 10.5 15.5 L 10.5 3.5 M 9.5 16.5 C 10.052 16.5 10.5 16.052 10.5 15.5 M 8.5 15.5 C 8.5 16.052 8.948 16.5 9.5 16.5 M 8.5 3.5 L 8.5 15.5 M 9.5 2.5 C 8.948 2.5 8.5 2.948 8.5 3.5 Z M 19.5 3.5 C 19.5 2.948 19.052 2.5 18.5 2.5 M 19.5 15.5 L 19.5 3.5 M 18.5 16.5 C 19.052 16.5 19.5 16.052 19.5 15.5 M 17.5 15.5 C 17.5 16.052 17.948 16.5 18.5 16.5 M 17.5 3.5 L 17.5 15.5 M 18.5 2.5 C 17.948 2.5 17.5 2.948 17.5 3.5 Z M 6 8.5 C 6 7.948 5.552 7.5 5 7.5 M 6 15.5 L 6 8.5 M 5 16.5 C 5.552 16.5 6 16.052 6 15.5 M 4 15.5 C 4 16.052 4.448 16.5 5 16.5 M 4 8.5 L 4 15.5 M 5 7.5 C 4.448 7.5 4 7.948 4 8.5 Z M 15 8.5 C 15 7.948 14.552 7.5 14 7.5 M 15 15.5 L 15 8.5 M 14 16.5 C 14.552 16.5 15 16.052 15 15.5 M 13 15.5 C 13 16.052 13.448 16.5 14 16.5 M 13 8.5 L 13 15.5 M 14 7.5 C 13.448 7.5 13 7.948 13 8.5 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { BarChart07, __ds_default_components_glyphs_BarChart07_1mb2m9a: BarChart07 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/BarChart07.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/Briefcase02.jsx
try { (() => {
// figma node: 1:1084 briefcase-02
function Briefcase02(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--color-fg-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 22,
    height: 20,
    viewBox: "0 0 22 20",
    fill: "none",
    style: {
      position: "absolute",
      left: 1,
      top: 2,
      width: 22,
      height: 20
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 11 0 C 10.953 0 10.908 0 10.862 0 M 11.138 0 C 11.092 0 11.047 0 11 0 M 13.035 0.136 C 12.524 -0.001 11.933 0 11.138 0 M 15.864 2.965 C 15.494 1.584 14.416 0.506 13.035 0.136 M 15.992 4 C 15.979 3.608 15.946 3.272 15.864 2.965 M 17.839 4 L 15.992 4 M 19.195 4.031 C 18.82 4 18.366 4 17.839 4 M 20.362 4.327 C 19.984 4.134 19.59 4.063 19.195 4.031 M 21.673 5.638 C 21.385 5.074 20.926 4.615 20.362 4.327 M 21.969 6.805 C 21.937 6.41 21.866 6.017 21.673 5.638 M 22 8.162 C 22 7.634 22 7.18 21.969 6.805 M 22 15.839 L 22 8.162 M 21.969 17.195 C 22 16.821 22 16.366 22 15.839 M 21.673 18.362 C 21.866 17.984 21.937 17.59 21.969 17.195 M 20.362 19.673 C 20.926 19.385 21.385 18.927 21.673 18.362 M 19.195 19.97 C 19.59 19.937 19.984 19.866 20.362 19.673 M 17.839 20 C 18.366 20 18.82 20 19.195 19.97 M 4.161 20 L 17.839 20 M 2.805 19.97 C 3.18 20 3.634 20 4.161 20 M 1.638 19.673 C 2.016 19.866 2.41 19.937 2.805 19.97 M 0.327 18.362 C 0.615 18.927 1.074 19.385 1.638 19.673 M 0.031 17.195 C 0.063 17.59 0.134 17.984 0.327 18.362 M 0 15.839 C 0 16.366 0 16.821 0.031 17.195 M 0 8.162 L 0 15.839 M 0.031 6.805 C 0 7.18 0 7.634 0 8.162 M 0.327 5.638 C 0.134 6.017 0.063 6.41 0.031 6.805 M 1.638 4.327 C 1.074 4.615 0.615 5.074 0.327 5.638 M 2.805 4.031 C 2.41 4.063 2.016 4.134 1.638 4.327 M 4.161 4 C 3.634 4 3.18 4 2.805 4.031 M 6.008 4 L 4.161 4 M 6.136 2.965 C 6.054 3.272 6.021 3.608 6.008 4 M 8.965 0.136 C 7.584 0.506 6.506 1.584 6.136 2.965 M 10.862 0 C 10.067 0 9.476 -0.001 8.965 0.136 Z M 4.2 6 L 6 6 M 2.968 6.024 C 3.251 6.001 3.623 6 4.2 6 M 2.546 6.109 C 2.595 6.084 2.696 6.046 2.968 6.024 M 2.109 6.546 C 2.205 6.358 2.358 6.205 2.546 6.109 M 2.024 6.968 C 2.046 6.696 2.084 6.596 2.109 6.546 M 2 8.2 C 2 7.624 2.001 7.251 2.024 6.968 M 2 15.8 L 2 8.2 M 2.024 17.032 C 2.001 16.749 2 16.377 2 15.8 M 2.109 17.454 C 2.084 17.405 2.046 17.304 2.024 17.032 M 2.546 17.891 C 2.358 17.795 2.205 17.642 2.109 17.454 M 2.968 17.976 C 2.696 17.954 2.595 17.916 2.546 17.891 M 4.2 18 C 3.623 18 3.251 17.999 2.968 17.976 M 6 18 L 4.2 18 M 6 6 L 6 18 Z M 8 18 L 8 6 L 14 6 L 14 18 L 8 18 Z M 17.8 18 L 16 18 M 19.032 17.976 C 18.749 17.999 18.377 18 17.8 18 M 19.454 17.891 C 19.405 17.916 19.304 17.954 19.032 17.976 M 19.891 17.454 C 19.795 17.642 19.642 17.795 19.454 17.891 M 19.976 17.032 C 19.954 17.304 19.916 17.405 19.891 17.454 M 20 15.8 C 20 16.377 19.999 16.749 19.976 17.032 M 20 8.2 L 20 15.8 M 19.976 6.968 C 19.999 7.251 20 7.624 20 8.2 M 19.891 6.546 C 19.916 6.596 19.954 6.696 19.976 6.968 M 19.454 6.109 C 19.642 6.205 19.795 6.358 19.891 6.546 M 19.032 6.024 C 19.304 6.046 19.405 6.084 19.454 6.109 M 17.8 6 C 18.377 6 18.749 6.001 19.032 6.024 M 16 6 L 17.8 6 M 16 18 L 16 6 Z M 13.99 4 L 8.01 4 C 8.019 3.743 8.036 3.601 8.068 3.482 C 8.253 2.792 8.792 2.253 9.482 2.068 C 9.705 2.009 10.006 2 11 2 C 11.994 2 12.295 2.009 12.518 2.068 C 13.208 2.253 13.747 2.792 13.932 3.482 C 13.964 3.601 13.981 3.743 13.99 4 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { Briefcase02, __ds_default_components_glyphs_Briefcase02_3p9jt2: Briefcase02 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/Briefcase02.jsx", error: String((e && e.message) || e) }); }

// components/annotation/Notes.jsx
try { (() => {
// figma node: 1:1086 Notes (3 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "noteType=" + __venc(p.noteType);
function Notes(_p = {}) {
  const props = {
    ..._p,
    description: _p.description ?? "This is a description of a screen in the flow or something else I want a developer to be aware of.",
    noteType: _p.noteType ?? "business note",
    showReccomendation: _p.showReccomendation ?? false,
    solutionReccomendation: _p.solutionReccomendation ?? "This is a description of a screen in the flow or something else I want a developer to be aware of."
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 320,
      boxShadow: "0px 6px 20px 0px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      backgroundColor: "rgb(255,240,163)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 16px 8px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "icons-deliveroo, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 24,
      whiteSpace: "nowrap",
      lineHeight: "100%",
      color: "rgb(11,14,14)",
      flexShrink: 0
    }
  }, props.text1 ?? "rocket-l"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "\"IBM Plex Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "rgb(11,14,14)",
      flexShrink: 0
    }
  }, props.text2 ?? "Developer note")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      backgroundColor: "rgb(255,255,255)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: "8px 16px 24px 16px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "24px",
      color: "rgb(46,51,51)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.description), props.showReccomendation && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "24px",
      color: "rgb(46,51,51)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.solutionReccomendation)), /*#__PURE__*/React.createElement("svg", {
    height: 19,
    viewBox: "0 0 320 19",
    fill: "none",
    style: {
      position: "relative",
      height: 19,
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 40 0 L 0 0 L 20 19 L 40 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 60 19 L 40 0 L 80 0 L 60 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 100 19 L 80 0 L 120 0 L 100 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 140 19 L 120 0 L 160 0 L 140 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 180 19 L 160 0 L 200 0 L 180 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 220 19 L 200 0 L 240 0 L 220 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 260 19 L 240 0 L 280 0 L 260 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 300 19 L 280 0 L 320 0 L 300 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 320,
      boxShadow: "0px 6px 20px 0px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      backgroundColor: "rgb(250,183,233)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 16px 8px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "icons-deliveroo, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 24,
      whiteSpace: "nowrap",
      lineHeight: "100%",
      color: "rgb(11,14,14)",
      flexShrink: 0
    }
  }, props.text1 ?? "pencil"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "\"IBM Plex Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "rgb(11,14,14)",
      flexShrink: 0
    }
  }, props.text2 ?? "Designer note")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      backgroundColor: "rgb(255,255,255)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: "8px 16px 24px 16px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "24px",
      color: "rgb(46,51,51)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.description), props.showReccomendation && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "24px",
      color: "rgb(46,51,51)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.solutionReccomendation)), /*#__PURE__*/React.createElement("svg", {
    height: 19,
    viewBox: "0 0 320 19",
    fill: "none",
    style: {
      position: "relative",
      height: 19,
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 40 0 L 0 0 L 20 19 L 40 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 60 19 L 40 0 L 80 0 L 60 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 100 19 L 80 0 L 120 0 L 100 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 140 19 L 120 0 L 160 0 L 140 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 180 19 L 160 0 L 200 0 L 180 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 220 19 L 200 0 L 240 0 L 220 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 260 19 L 240 0 L 280 0 L 260 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 300 19 L 280 0 L 320 0 L 300 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
  const __body2 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 320,
      boxShadow: "0px 6px 20px 0px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      backgroundColor: "rgb(214,234,255)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 16px 8px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.Briefcase02, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "\"IBM Plex Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "rgb(11,14,14)",
      flexShrink: 0
    }
  }, props.text1 ?? "Business note")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      backgroundColor: "rgb(255,255,255)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: "8px 16px 24px 16px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "24px",
      color: "rgb(46,51,51)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.description), props.showReccomendation && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "24px",
      color: "rgb(46,51,51)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.solutionReccomendation)), /*#__PURE__*/React.createElement("svg", {
    height: 19,
    viewBox: "0 0 320 19",
    fill: "none",
    style: {
      position: "relative",
      height: 19,
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 40 0 L 0 0 L 20 19 L 40 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 60 19 L 40 0 L 80 0 L 60 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 100 19 L 80 0 L 120 0 L 100 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 140 19 L 120 0 L 160 0 L 140 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 180 19 L 160 0 L 200 0 L 180 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 220 19 L 200 0 L 240 0 L 220 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 260 19 L 240 0 L 280 0 L 260 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 300 19 L 280 0 L 320 0 L 300 19 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
  const __impls = {
    // figma: Note type=Developer note
    "noteType=developer note": __body0,
    // figma: Note type=Designer note
    "noteType=designer note": __body1,
    // figma: Note type=Business note
    "noteType=business note": __body2
  };
  return (__impls[__vkey(props)] ?? __body2)();
}
Object.assign(__ds_scope, { Notes, __ds_default_components_annotation_Notes_1rhsnu5: Notes });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/annotation/Notes.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/ChevronDown.jsx
try { (() => {
// figma node: 1:453 chevron-down
function ChevronDown(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--icon-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 14,
    height: 8,
    viewBox: "0 0 14 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 5,
      top: 8,
      width: 14,
      height: 8
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.707 0.293 C 1.317 -0.098 0.683 -0.098 0.293 0.293 M 7 5.586 L 1.707 0.293 M 12.293 0.293 L 7 5.586 M 13.707 0.293 C 13.317 -0.098 12.683 -0.098 12.293 0.293 M 13.707 1.707 C 14.098 1.317 14.098 0.683 13.707 0.293 M 7.707 7.707 L 13.707 1.707 M 6.293 7.707 C 6.683 8.098 7.317 8.098 7.707 7.707 M 0.293 1.707 L 6.293 7.707 M 0.293 0.293 C -0.098 0.683 -0.098 1.317 0.293 1.707 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { ChevronDown, __ds_default_components_glyphs_ChevronDown_ckp0t: ChevronDown });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/ChevronDown.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/ChevronDownFilled.jsx
try { (() => {
// figma node: 173:3408 chevron-down-filled
function ChevronDownFilled(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      position: "relative",
      color: "var(--icon-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 14,
    height: 8,
    viewBox: "0 0 14 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 5,
      top: 8,
      width: 14,
      height: 8
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1.707 0.293 C 1.317 -0.098 0.683 -0.098 0.293 0.293 M 7 5.586 L 1.707 0.293 M 12.293 0.293 L 7 5.586 M 13.707 0.293 C 13.317 -0.098 12.683 -0.098 12.293 0.293 M 13.707 1.707 C 14.098 1.317 14.098 0.683 13.707 0.293 M 7.707 7.707 L 13.707 1.707 M 6.293 7.707 C 6.683 8.098 7.317 8.098 7.707 7.707 M 0.293 1.707 L 6.293 7.707 M 0.293 0.293 C -0.098 0.683 -0.098 1.317 0.293 1.707 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { ChevronDownFilled, __ds_default_components_glyphs_ChevronDownFilled_zz4qvx: ChevronDownFilled });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/ChevronDownFilled.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/ChevronUp.jsx
try { (() => {
// figma node: 1:639 chevron-up
function ChevronUp(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--icon-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 14,
    height: 8,
    viewBox: "0 0 14 8",
    fill: "none",
    style: {
      position: "absolute",
      left: 5,
      top: 8,
      width: 14,
      height: 8
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7.707 0.293 C 7.317 -0.098 6.683 -0.098 6.293 0.293 M 13.707 6.293 L 7.707 0.293 M 13.707 7.707 C 14.098 7.317 14.098 6.683 13.707 6.293 M 12.293 7.707 C 12.683 8.098 13.317 8.098 13.707 7.707 M 7 2.414 L 12.293 7.707 M 1.707 7.707 L 7 2.414 M 0.293 7.707 C 0.683 8.098 1.317 8.098 1.707 7.707 M 0.293 6.293 C -0.098 6.683 -0.098 7.317 0.293 7.707 M 6.293 0.293 L 0.293 6.293 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { ChevronUp, __ds_default_components_glyphs_ChevronUp_1vpdbfe: ChevronUp });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/ChevronUp.jsx", error: String((e && e.message) || e) }); }

// components/accordions/HealthAccordion.jsx
try { (() => {
// figma node: 173:3702 Health Accordion (2 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "property1=" + __venc(p.property1);
function HealthAccordion(_p = {}) {
  const props = {
    ..._p,
    property1: _p.property1 ?? "colapsed"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "12px 16px 12px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 48,
    height: 48,
    viewBox: "0 0 48 48",
    fill: "none",
    style: {
      position: "relative",
      width: 48,
      height: 48,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0 L 48 0 L 48 48 L 0 48 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 16,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexShrink: 0
    }
  }, props.text1 ?? "View health details")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 7,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, props.text2 ?? "Updated on 01/01/25")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDownFilled, null))));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "12px 16px 12px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "var(--border-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 48,
    height: 48,
    viewBox: "0 0 48 48",
    fill: "none",
    style: {
      position: "relative",
      width: 48,
      height: 48,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0 L 48 0 L 48 48 L 0 48 L 0 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 16,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexShrink: 0
    }
  }, props.text1 ?? "View health details")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 7,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, props.text2 ?? "Updated on 01/01/25")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronUp, null))), /*#__PURE__*/React.createElement("svg", {
    height: 1,
    viewBox: "0 -0.500 348 1",
    fill: "none",
    style: {
      position: "relative",
      height: 1,
      opacity: 0.5,
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 348 0 L 348 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 348 0.5 L 348 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text3 ?? "Height"), /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-a2d8ee99173a02c2-ed6ab91b",
    style: {
      position: "absolute",
      left: 62,
      top: 24.993,
      width: 30,
      height: 38.226
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 2,
      alignItems: "flex-end",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text4 ?? "-"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, "cm"))), /*#__PURE__*/React.createElement("svg", {
    width: 58,
    height: 1,
    viewBox: "0 -0.500 58 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,112.667,67)",
      transformOrigin: "0 0",
      width: 58,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 58 0 L 58 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 58 0.5 L 58 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, "Weight"), /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-a2d8ee99173a02c2-8878451b",
    style: {
      position: "absolute",
      left: 55,
      top: 24.993,
      width: 33,
      height: 38
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 2,
      alignItems: "flex-end",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, "-"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, "kg"))), /*#__PURE__*/React.createElement("svg", {
    width: 58,
    height: 1,
    viewBox: "0 -0.500 58 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,235.333,67)",
      transformOrigin: "0 0",
      width: 58,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 58 0 L 58 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 58 0.5 L 58 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, "Hb Level")), /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-a2d8ee99173a02c2-8a097726",
    style: {
      position: "absolute",
      left: 74,
      top: 36.993,
      width: 30,
      height: 38.226
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 2,
      alignItems: "flex-end",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, "-"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, "g/dL")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 103,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, "BMI"), /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-72829ef30d75bba0-a6d22795",
    style: {
      position: "absolute",
      left: 62,
      top: 24.993,
      width: 30,
      height: 33
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 2,
      alignItems: "flex-end",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, "-"))), /*#__PURE__*/React.createElement("svg", {
    width: 58,
    height: 1,
    viewBox: "0 -0.500 58 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,113,67)",
      transformOrigin: "0 0",
      width: 58,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 58 0 L 58 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 58 0.5 L 58 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 103,
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, "Blood Group"), /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-f246c8b7bef80c12-60924feb",
    style: {
      position: "absolute",
      left: 55,
      top: 20,
      width: 37,
      height: 43
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 2,
      alignItems: "flex-end",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, "-"))), /*#__PURE__*/React.createElement("svg", {
    width: 58,
    height: 1,
    viewBox: "0 -0.500 58 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,236,67)",
      transformOrigin: "0 0",
      width: 58,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 58 0 L 58 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 58 0.5 L 58 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
  const __impls = {
    // figma: Property 1=Colapsed
    "property1=colapsed": __body0,
    // figma: Property 1=Expanded
    "property1=expanded": __body1
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
Object.assign(__ds_scope, { HealthAccordion, __ds_default_components_accordions_HealthAccordion_1nt3pcm: HealthAccordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/accordions/HealthAccordion.jsx", error: String((e && e.message) || e) }); }

// components/accordions/InfoAccordion.jsx
try { (() => {
// figma node: 173:3767 Info Accordion (2 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "property1=" + __venc(p.property1);
function InfoAccordion(_p = {}) {
  const props = {
    ..._p,
    title: _p.title ?? "The Plan:",
    property1: _p.property1 ?? "colapsed",
    showPlan: _p.showPlan ?? false,
    comingSoon: _p.comingSoon ?? true
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      padding: "16px 16px 16px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-e66354ecf144e3aa-82533cdb",
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 16,
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexGrow: 1
    }
  }, props.title), /*#__PURE__*/React.createElement(__ds_scope.BadgeAccentTag, {
    style: {
      position: "relative",
      height: 20,
      width: 79,
      flexShrink: 0
    },
    text1: "Coming Soon",
    colour: "neutral",
    type: "default"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)))));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      padding: "16px 16px 16px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "var(--border-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-e66354ecf144e3aa-82533cdb",
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 16,
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexGrow: 1
    }
  }, props.title), /*#__PURE__*/React.createElement(__ds_scope.BadgeAccentTag, {
    style: {
      position: "relative",
      height: 20,
      width: 79,
      flexShrink: 0
    },
    text1: "Coming Soon",
    colour: "neutral",
    type: "default"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronUp, null))), /*#__PURE__*/React.createElement("svg", {
    height: 1,
    viewBox: "0 -0.500 348 1",
    fill: "none",
    style: {
      position: "relative",
      height: 1,
      opacity: 0.5,
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 348 0 L 348 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 348 0.5 L 348 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), props.showPlan && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "20px",
      letterSpacing: "-0.150px",
      color: "var(--text-headings-2)",
      flexShrink: 0,
      alignSelf: "stretch",
      whiteSpace: "nowrap"
    }
  }, props.text1 ?? "1. What I will do"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "20px",
      letterSpacing: "-0.150px",
      color: "var(--text-muted)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.text2 ?? "Read grammar rules daily, practice essay writing twice a week")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "20px",
      letterSpacing: "-0.150px",
      color: "var(--text-headings-2)",
      flexShrink: 0,
      alignSelf: "stretch",
      whiteSpace: "nowrap"
    }
  }, props.text3 ?? "2. What Support will I need"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "20px",
      letterSpacing: "-0.150px",
      color: "var(--text-muted)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.text4 ?? "Request feedback from Hindi teacher, use online grammar tools")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "20px",
      letterSpacing: "-0.150px",
      color: "var(--text-headings-2)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, "3. How will I check the progress"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "20px",
      letterSpacing: "-0.150px",
      color: "var(--text-muted)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, "Monthly grammar tests, count error reduction in essays"))), props.comingSoon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-2805175ff0d4a600-f7a75f63",
    style: {
      position: "relative",
      width: 66,
      height: 80,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      textAlign: "center",
      lineHeight: "20px",
      color: "var(--text-headings-2)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, "This section will be active soon!"))));
  const __impls = {
    // figma: Property 1=Colapsed
    "property1=colapsed": __body0,
    // figma: Property 1=Expanded
    "property1=expanded": __body1
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
Object.assign(__ds_scope, { InfoAccordion, __ds_default_components_accordions_InfoAccordion_m3zy6k: InfoAccordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/accordions/InfoAccordion.jsx", error: String((e && e.message) || e) }); }

// components/accordions/PendingAccordion.jsx
try { (() => {
// figma node: 173:3796 Pending Accordion (2 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "property1=" + __venc(p.property1);
function PendingAccordion(_p = {}) {
  const props = {
    ..._p,
    property1: _p.property1 ?? "1"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      padding: "16px 16px 16px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-02c691967bd30b89-0a2a6523",
    style: {
      position: "relative",
      width: 48,
      height: 45,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "\"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "28px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text1 ?? "Time Management"), /*#__PURE__*/React.createElement(__ds_scope.BadgeAccentTag, {
    style: {
      position: "relative",
      height: 20,
      width: 79,
      flexShrink: 0
    },
    text1: "Coming Soon",
    colour: "neutral",
    type: "default"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null))));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      padding: "16px 16px 16px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "var(--border-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-02c691967bd30b89-0a2a6523",
    style: {
      position: "relative",
      width: 48,
      height: 45,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "\"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "28px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text1 ?? "Time Management"), /*#__PURE__*/React.createElement(__ds_scope.BadgeAccentTag, {
    style: {
      position: "relative",
      height: 20,
      width: 79,
      flexShrink: 0
    },
    text1: "Coming Soon",
    colour: "neutral",
    type: "default"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronUp, null))), /*#__PURE__*/React.createElement("svg", {
    height: 1,
    viewBox: "0 -0.500 348 1",
    fill: "none",
    style: {
      position: "relative",
      height: 1,
      opacity: 0.5,
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 348 0 L 348 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 348 0.5 L 348 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-eac1c37baa47a618-af4bf4fa",
    style: {
      position: "relative",
      width: 66,
      height: 80,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      textAlign: "center",
      lineHeight: "20px",
      color: "var(--text-headings-2)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.text2 ?? "This section will be active soon!"));
  const __impls = {
    // figma: Property 1=1
    "property1=1": __body0,
    // figma: Property 1=2
    "property1=2": __body1
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
Object.assign(__ds_scope, { PendingAccordion, __ds_default_components_accordions_PendingAccordion_fblnj9: PendingAccordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/accordions/PendingAccordion.jsx", error: String((e && e.message) || e) }); }

// components/display/SpeedWidgets.jsx
try { (() => {
// figma node: 173:3812 Speed_Widgets (2 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "property1=" + __venc(p.property1);
function SpeedWidgets(_p = {}) {
  const props = {
    ..._p,
    property1: _p.property1 ?? "default"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      padding: "16px 16px 16px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-860b67f5df5a4c77-b263d2a8",
    style: {
      position: "relative",
      width: 48,
      height: 38,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 16,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexGrow: 1
    }
  }, props.text1 ?? "Plans after School"), /*#__PURE__*/React.createElement(__ds_scope.BadgeAccentTag, {
    style: {
      position: "relative",
      height: 20,
      width: 79,
      flexShrink: 0
    },
    text1: "Coming Soon",
    colour: "neutral",
    type: "default"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)))));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      padding: "16px 16px 16px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "var(--border-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-860b67f5df5a4c77-b263d2a8",
    style: {
      position: "relative",
      width: 48,
      height: 39,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 16,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexGrow: 1
    }
  }, props.text1 ?? "Plans after School"), /*#__PURE__*/React.createElement(__ds_scope.BadgeAccentTag, {
    style: {
      position: "relative",
      height: 20,
      width: 79,
      flexShrink: 0
    },
    text1: "Coming Soon",
    colour: "neutral",
    type: "default"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronUp, null)))), /*#__PURE__*/React.createElement("svg", {
    height: 1,
    viewBox: "0 -0.500 348 1",
    fill: "none",
    style: {
      position: "relative",
      height: 1,
      opacity: 0.5,
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 348 0 L 348 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 348 0.5 L 348 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-2805175ff0d4a600-f7a75f63",
    style: {
      position: "relative",
      width: 66,
      height: 80,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      textAlign: "center",
      lineHeight: "20px",
      color: "var(--text-headings-2)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.text2 ?? "This section will be active soon!")));
  const __impls = {
    // figma: Property 1=Default
    "property1=default": __body0,
    // figma: Property 1=Variant2
    "property1=variant2": __body1
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
Object.assign(__ds_scope, { SpeedWidgets, __ds_default_components_display_SpeedWidgets_1gvaghz: SpeedWidgets });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/SpeedWidgets.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/Circle.jsx
try { (() => {
// figma node: 1:421 circle
function Circle(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--icon-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 22,
    height: 22,
    viewBox: "0 0 22 22",
    fill: "none",
    style: {
      position: "absolute",
      left: 1,
      top: 1,
      width: 22,
      height: 22
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2 11 C 2 6.029 6.029 2 11 2 M 11 20 C 6.029 20 2 15.971 2 11 M 20 11 C 20 15.971 15.971 20 11 20 M 11 2 C 15.971 2 20 6.029 20 11 Z M 11 0 C 4.925 0 0 4.925 0 11 M 22 11 C 22 4.925 17.075 0 11 0 M 11 22 C 17.075 22 22 17.075 22 11 M 0 11 C 0 17.075 4.925 22 11 22 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { Circle, __ds_default_components_glyphs_Circle_rap71u: Circle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/Circle.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
// figma node: 1:262 Button (68 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "size=" + __venc(p.size) + '|' + "variant=" + __venc(p.variant) + '|' + "disabled=" + __venc(p.disabled) + '|' + "state=" + __venc(p.state);
function Button(_p = {}) {
  const props = {
    ..._p,
    leftIcon: _p.leftIcon ?? false,
    size: _p.size ?? "sm",
    rightIcon: _p.rightIcon ?? false,
    variant: _p.variant ?? "outline",
    text: _p.text ?? "Button",
    disabled: _p.disabled ?? false,
    state: _p.state ?? "default",
    muted: _p.muted ?? false
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 36,
      borderRadius: 999,
      backgroundColor: "var(--button-surface-plain-hover)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 32,
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      boxShadow: "inset 0 0 0 1px var(--border-primary)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body2 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 32,
      borderRadius: 999,
      backgroundColor: "var(--button-surface-primary-hover)",
      boxShadow: "inset 0 0 0 1px var(--border-primary)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body3 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 40,
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-hover)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body4 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 36,
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body5 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 40,
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body6 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body7 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 40,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body8 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--surface-disabled)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-disabled)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body9 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body10 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-hover)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body11 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 40,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body12 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      boxShadow: "inset 0 0 0 1px var(--border-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body13 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body14 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-primary-hover)",
      boxShadow: "inset 0 0 0 1px var(--border-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body15 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-hover)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body16 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body17 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 40,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body18 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 40,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body19 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body20 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-plain-hover)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body21 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body22 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 62,
      height: 36,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body23 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--surface-disabled)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-disabled)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body24 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body25 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-hover)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body26 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action)",
      boxShadow: "inset 0 0 0 1px var(--border-focus), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 62,
      height: 36,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body27 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body28 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-hover)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body29 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      boxShadow: "inset 0 0 0 1px var(--border-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body30 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body31 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 62,
      height: 36,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body32 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm) * 1px)",
      paddingRight: "calc(var(--spacing-sm) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 62,
      height: 36,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body33 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body34 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-plain-hover)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body35 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body36 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 44,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body37 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--surface-disabled)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-disabled)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body38 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body39 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-hover)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body40 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action)",
      boxShadow: "inset 0 0 0 1px var(--border-focus), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 44,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body41 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      boxShadow: "inset 0 0 0 1px var(--border-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body42 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-primary-hover)",
      boxShadow: "inset 0 0 0 1px var(--border-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body43 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body44 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 44,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body45 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md) * 1px)",
      paddingRight: "calc(var(--spacing-md) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 44,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body46 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body47 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-plain-hover)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body48 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body49 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 87,
      height: 48,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body50 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--surface-disabled)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-on-disabled)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body51 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body52 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-hover)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body53 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action)",
      boxShadow: "inset 0 0 0 1px var(--border-focus), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 87,
      height: 48,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body54 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      boxShadow: "inset 0 0 0 1px var(--border-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body55 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body56 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-primary-hover)",
      boxShadow: "inset 0 0 0 1px var(--border-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body57 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-hover)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body58 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body59 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-action)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 87,
      height: 48,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body60 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline)",
      boxShadow: "inset 0 0 0 1px var(--border-default), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg) * 1px)",
      paddingRight: "calc(var(--spacing-lg) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 87,
      height: 48,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __impls = {
    // figma: Size=md, Variant=Plain, State=Hover, Disabled=False
    "size=md|variant=plain|disabled=false|state=hover": __body0,
    // figma: Size=sm, Variant=Secondary, State=Default, Disabled=False
    "size=sm|variant=secondary|disabled=false|state=default": __body1,
    // figma: Size=sm, Variant=Secondary, State=Hover, Disabled=False
    "size=sm|variant=secondary|disabled=false|state=hover": __body2,
    // figma: Size=lg, Variant=Outline, State=Hover, Disabled=False
    "size=lg|variant=outline|disabled=false|state=hover": __body3,
    // figma: Size=md, Variant=Plain, State=Default, Disabled=False
    "size=md|variant=plain|disabled=false|state=default": __body4,
    // figma: Size=lg, Variant=Outline, State=Default, Disabled=False
    "size=lg|variant=outline|disabled=false|state=default": __body5,
    // figma: Size=md, Variant=Plain, State=Active, Disabled=False
    "size=md|variant=plain|disabled=false|state=active": __body6,
    // figma: Size=md, Variant=Plain, State=Focus, Disabled=False
    "size=md|variant=plain|disabled=false|state=focus": __body7,
    // figma: Size=md, Variant=Solid, State=Default, Disabled=True
    "size=md|variant=solid|disabled=true|state=default": __body8,
    // figma: Size=md, Variant=Solid, State=Default, Disabled=False
    "size=md|variant=solid|disabled=false|state=default": __body9,
    // figma: Size=md, Variant=Solid, State=Hover, Disabled=False
    "size=md|variant=solid|disabled=false|state=hover": __body10,
    // figma: Size=md, Variant=Solid, State=Active, Disabled=False
    "size=md|variant=solid|disabled=false|state=active": __body9,
    // figma: Size=md, Variant=Solid, State=Focus, Disabled=False
    "size=md|variant=solid|disabled=false|state=focus": __body11,
    // figma: Size=md, Variant=Secondary, State=Default, Disabled=False
    "size=md|variant=secondary|disabled=false|state=default": __body12,
    // figma: Size=md, Variant=Outline, State=Default, Disabled=False
    "size=md|variant=outline|disabled=false|state=default": __body13,
    // figma: Size=md, Variant=Secondary, State=Hover, Disabled=False
    "size=md|variant=secondary|disabled=false|state=hover": __body14,
    // figma: Size=md, Variant=Outline, State=Hover, Disabled=False
    "size=md|variant=outline|disabled=false|state=hover": __body15,
    // figma: Size=md, Variant=Secondary, State=Active, Disabled=False
    "size=md|variant=secondary|disabled=false|state=active": __body12,
    // figma: Size=md, Variant=Outline, State=Active, Disabled=False
    "size=md|variant=outline|disabled=false|state=active": __body16,
    // figma: Size=md, Variant=Secondary, State=Focus, Disabled=False
    "size=md|variant=secondary|disabled=false|state=focus": __body17,
    // figma: Size=md, Variant=Outline, State=Focus, Disabled=False
    "size=md|variant=outline|disabled=false|state=focus": __body18,
    // figma: Size=sm, Variant=Plain, State=Default, Disabled=False
    "size=sm|variant=plain|disabled=false|state=default": __body19,
    // figma: Size=sm, Variant=Plain, State=Hover, Disabled=False
    "size=sm|variant=plain|disabled=false|state=hover": __body20,
    // figma: Size=sm, Variant=Plain, State=Active, Disabled=False
    "size=sm|variant=plain|disabled=false|state=active": __body21,
    // figma: Size=sm, Variant=Plain, State=Focus, Disabled=False
    "size=sm|variant=plain|disabled=false|state=focus": __body22,
    // figma: Size=sm, Variant=Solid, State=Default, Disabled=True
    "size=sm|variant=solid|disabled=true|state=default": __body23,
    // figma: Size=sm, Variant=Solid, State=Default, Disabled=False
    "size=sm|variant=solid|disabled=false|state=default": __body24,
    // figma: Size=sm, Variant=Solid, State=Hover, Disabled=False
    "size=sm|variant=solid|disabled=false|state=hover": __body25,
    // figma: Size=sm, Variant=Solid, State=Active, Disabled=False
    "size=sm|variant=solid|disabled=false|state=active": __body24,
    // figma: Size=sm, Variant=Solid, State=Focus, Disabled=False
    "size=sm|variant=solid|disabled=false|state=focus": __body26,
    // figma: Size=sm, Variant=Outline, State=Default, Disabled=False
    "size=sm|variant=outline|disabled=false|state=default": __body27,
    // figma: Size=sm, Variant=Outline, State=Hover, Disabled=False
    "size=sm|variant=outline|disabled=false|state=hover": __body28,
    // figma: Size=sm, Variant=Secondary, State=Active, Disabled=False
    "size=sm|variant=secondary|disabled=false|state=active": __body29,
    // figma: Size=sm, Variant=Outline, State=Active, Disabled=False
    "size=sm|variant=outline|disabled=false|state=active": __body30,
    // figma: Size=sm, Variant=Secondary, State=Focus, Disabled=False
    "size=sm|variant=secondary|disabled=false|state=focus": __body31,
    // figma: Size=sm, Variant=Outline, State=Focus, Disabled=False
    "size=sm|variant=outline|disabled=false|state=focus": __body32,
    // figma: Size=lg, Variant=Plain, State=Default, Disabled=False
    "size=lg|variant=plain|disabled=false|state=default": __body33,
    // figma: Size=lg, Variant=Plain, State=Hover, Disabled=False
    "size=lg|variant=plain|disabled=false|state=hover": __body34,
    // figma: Size=lg, Variant=Plain, State=Active, Disabled=False
    "size=lg|variant=plain|disabled=false|state=active": __body35,
    // figma: Size=lg, Variant=Plain, State=Focus, Disabled=False
    "size=lg|variant=plain|disabled=false|state=focus": __body36,
    // figma: Size=lg, Variant=Solid, State=Default, Disabled=True
    "size=lg|variant=solid|disabled=true|state=default": __body37,
    // figma: Size=lg, Variant=Solid, State=Default, Disabled=False
    "size=lg|variant=solid|disabled=false|state=default": __body38,
    // figma: Size=lg, Variant=Solid, State=Hover, Disabled=False
    "size=lg|variant=solid|disabled=false|state=hover": __body39,
    // figma: Size=lg, Variant=Solid, State=Active, Disabled=False
    "size=lg|variant=solid|disabled=false|state=active": __body38,
    // figma: Size=lg, Variant=Solid, State=Focus, Disabled=False
    "size=lg|variant=solid|disabled=false|state=focus": __body40,
    // figma: Size=lg, Variant=Secondary, State=Default, Disabled=False
    "size=lg|variant=secondary|disabled=false|state=default": __body41,
    // figma: Size=lg, Variant=Secondary, State=Hover, Disabled=False
    "size=lg|variant=secondary|disabled=false|state=hover": __body42,
    // figma: Size=lg, Variant=Secondary, State=Active, Disabled=False
    "size=lg|variant=secondary|disabled=false|state=active": __body41,
    // figma: Size=lg, Variant=Outline, State=Active, Disabled=False
    "size=lg|variant=outline|disabled=false|state=active": __body43,
    // figma: Size=lg, Variant=Secondary, State=Focus, Disabled=False
    "size=lg|variant=secondary|disabled=false|state=focus": __body44,
    // figma: Size=lg, Variant=Outline, State=Focus, Disabled=False
    "size=lg|variant=outline|disabled=false|state=focus": __body45,
    // figma: Size=xl, Variant=Plain, State=Default, Disabled=False
    "size=xl|variant=plain|disabled=false|state=default": __body46,
    // figma: Size=xl, Variant=Plain, State=Hover, Disabled=False
    "size=xl|variant=plain|disabled=false|state=hover": __body47,
    // figma: Size=xl, Variant=Plain, State=Active, Disabled=False
    "size=xl|variant=plain|disabled=false|state=active": __body48,
    // figma: Size=xl, Variant=Plain, State=Focus, Disabled=False
    "size=xl|variant=plain|disabled=false|state=focus": __body49,
    // figma: Size=xl, Variant=Solid, State=Default, Disabled=True
    "size=xl|variant=solid|disabled=true|state=default": __body50,
    // figma: Size=xl, Variant=Solid, State=Default, Disabled=False
    "size=xl|variant=solid|disabled=false|state=default": __body51,
    // figma: Size=xl, Variant=Solid, State=Hover, Disabled=False
    "size=xl|variant=solid|disabled=false|state=hover": __body52,
    // figma: Size=xl, Variant=Solid, State=Active, Disabled=False
    "size=xl|variant=solid|disabled=false|state=active": __body51,
    // figma: Size=xl, Variant=Solid, State=Focus, Disabled=False
    "size=xl|variant=solid|disabled=false|state=focus": __body53,
    // figma: Size=xl, Variant=Secondary, State=Default, Disabled=False
    "size=xl|variant=secondary|disabled=false|state=default": __body54,
    // figma: Size=xl, Variant=Outline, State=Default, Disabled=False
    "size=xl|variant=outline|disabled=false|state=default": __body55,
    // figma: Size=xl, Variant=Secondary, State=Hover, Disabled=False
    "size=xl|variant=secondary|disabled=false|state=hover": __body56,
    // figma: Size=xl, Variant=Outline, State=Hover, Disabled=False
    "size=xl|variant=outline|disabled=false|state=hover": __body57,
    // figma: Size=xl, Variant=Secondary, State=Active, Disabled=False
    "size=xl|variant=secondary|disabled=false|state=active": __body54,
    // figma: Size=xl, Variant=Outline, State=Active, Disabled=False
    "size=xl|variant=outline|disabled=false|state=active": __body58,
    // figma: Size=xl, Variant=Secondary, State=Focus, Disabled=False
    "size=xl|variant=secondary|disabled=false|state=focus": __body59,
    // figma: Size=xl, Variant=Outline, State=Focus, Disabled=False
    "size=xl|variant=outline|disabled=false|state=focus": __body60
  };
  const __el = (__impls[__vkey(props)] ?? __body27)();
  // Muted state: same white/orange palette, lower emphasis — not disabled, not grey/black.
  return props.muted ? React.cloneElement(__el, {
    style: {
      ...__el.props.style,
      opacity: 0.55
    }
  }) : __el;
}
Object.assign(__ds_scope, { Button, __ds_default_components_actions_Button_8qpwqe: Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/Circle2.jsx
try { (() => {
// figma node: 173:239 circle
function Circle2(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--icon-default-2)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 22,
    height: 22,
    viewBox: "0 0 22 22",
    fill: "none",
    style: {
      position: "absolute",
      left: 1,
      top: 1,
      width: 22,
      height: 22
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2 11 C 2 6.029 6.029 2 11 2 M 11 20 C 6.029 20 2 15.971 2 11 M 20 11 C 20 15.971 15.971 20 11 20 M 11 2 C 15.971 2 20 6.029 20 11 Z M 11 0 C 4.925 0 0 4.925 0 11 M 22 11 C 22 4.925 17.075 0 11 0 M 11 22 C 17.075 22 22 17.075 22 11 M 0 11 C 0 17.075 4.925 22 11 22 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { Circle2, __ds_default_components_glyphs_Circle2_1cfqt0k: Circle2 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/Circle2.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button2.jsx
try { (() => {
// figma node: 173:192 Button (68 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "size=" + __venc(p.size) + '|' + "variant=" + __venc(p.variant) + '|' + "disabled=" + __venc(p.disabled) + '|' + "state=" + __venc(p.state);
function Button2(_p = {}) {
  const props = {
    ..._p,
    leftIcon: _p.leftIcon ?? false,
    size: _p.size ?? "sm",
    rightIcon: _p.rightIcon ?? false,
    variant: _p.variant ?? "solid",
    text: _p.text ?? "Button",
    disabled: _p.disabled ?? false,
    state: _p.state ?? "default",
    muted: _p.muted ?? false
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 36,
      borderRadius: 999,
      backgroundColor: "var(--surface-action-hover-2)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 36,
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body2 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 36,
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-hover-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body3 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 36,
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--surface-disabled-2)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-disabled-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body4 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: 36,
      borderRadius: 999,
      backgroundColor: "var(--surface-action-2)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body5 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md-2) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body6 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-plain-hover-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body7 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body8 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md-2) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 40,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body9 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-2)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body10 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-2)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 40,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body11 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      boxShadow: "inset 0 0 0 1px var(--border-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body12 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-primary-hover-2)",
      boxShadow: "inset 0 0 0 1px var(--border-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body13 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body14 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 40,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body15 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-md-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 40,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body16 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body17 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-plain-hover-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body18 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body19 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 62,
      height: 36,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body20 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--surface-disabled-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-disabled-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body21 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-2)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body22 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-hover-2)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body23 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-2)",
      boxShadow: "inset 0 0 0 1px var(--border-focus-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 62,
      height: 36,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body24 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      boxShadow: "inset 0 0 0 1px var(--border-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body25 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body26 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-primary-hover-2)",
      boxShadow: "inset 0 0 0 1px var(--border-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body27 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-hover-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body28 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body29 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 62,
      height: 36,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body30 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-sm-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 8px 0px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-sm-2) * 1px)",
      paddingRight: "calc(var(--spacing-sm-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 13,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 62,
      height: 36,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body31 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body32 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-plain-hover-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body33 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body34 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 44,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body35 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--surface-disabled-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-disabled-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body36 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-2)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body37 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-hover-2)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })));
  const __body38 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-2)",
      boxShadow: "inset 0 0 0 1px var(--border-focus-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.750, 0.750)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 44,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body39 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      boxShadow: "inset 0 0 0 1px var(--border-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body40 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body41 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-primary-hover-2)",
      boxShadow: "inset 0 0 0 1px var(--border-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body42 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-hover-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body43 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })));
  const __body44 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 44,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body45 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-large-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 12px 0px 12px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-md-2) * 1px)",
      paddingRight: "calc(var(--spacing-md-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 73,
      height: 44,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body46 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body47 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-plain-hover-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body48 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body49 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 87,
      height: 48,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body50 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--surface-disabled-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-on-disabled-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body51 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-2)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body52 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-hover-2)",
      boxShadow: "inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body53 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-action-2)",
      boxShadow: "inset 0 0 0 1px var(--border-focus-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-on-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 87,
      height: 48,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body54 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      boxShadow: "inset 0 0 0 1px var(--border-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body55 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      overflow: "hidden",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body56 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-primary-hover-2)",
      boxShadow: "inset 0 0 0 1px var(--border-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body57 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-hover-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body58 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body59 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--surface-primary-2)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-action-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-action-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 87,
      height: 48,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __body60 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      height: "calc(var(--height-button-xl-2) * 1px)",
      borderRadius: 999,
      backgroundColor: "var(--button-surface-outline-2)",
      boxShadow: "inset 0 0 0 1px var(--border-default-2), inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-xs-2) * 1px)",
      padding: "0px 16px 0px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-lg-2) * 1px)",
      paddingRight: "calc(var(--spacing-lg-2) * 1px)",
      position: "relative",
      ...props.style
    }
  }, props.leftIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-body-2)",
      flexShrink: 0
    }
  }, props.text), props.rightIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-muted-2)"
    }
  }, props.icon ?? /*#__PURE__*/React.createElement(__ds_scope.Circle2, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 87,
      height: 48,
      borderRadius: 999,
      boxShadow: "0 0 0 2px var(--border-focus-2)"
    }
  }));
  const __impls = {
    // figma: Size=md, Variant=Solid, State=Hover, Disabled=False
    "size=md|variant=solid|disabled=false|state=hover": __body0,
    // figma: Size=md, Variant=Outline, State=Default, Disabled=False
    "size=md|variant=outline|disabled=false|state=default": __body1,
    // figma: Size=md, Variant=Outline, State=Hover, Disabled=False
    "size=md|variant=outline|disabled=false|state=hover": __body2,
    // figma: Size=md, Variant=Solid, State=Default, Disabled=True
    "size=md|variant=solid|disabled=true|state=default": __body3,
    // figma: Size=md, Variant=Solid, State=Default, Disabled=False
    "size=md|variant=solid|disabled=false|state=default": __body4,
    // figma: Size=md, Variant=Plain, State=Default, Disabled=False
    "size=md|variant=plain|disabled=false|state=default": __body5,
    // figma: Size=md, Variant=Plain, State=Hover, Disabled=False
    "size=md|variant=plain|disabled=false|state=hover": __body6,
    // figma: Size=md, Variant=Plain, State=Active, Disabled=False
    "size=md|variant=plain|disabled=false|state=active": __body7,
    // figma: Size=md, Variant=Plain, State=Focus, Disabled=False
    "size=md|variant=plain|disabled=false|state=focus": __body8,
    // figma: Size=md, Variant=Solid, State=Active, Disabled=False
    "size=md|variant=solid|disabled=false|state=active": __body9,
    // figma: Size=md, Variant=Solid, State=Focus, Disabled=False
    "size=md|variant=solid|disabled=false|state=focus": __body10,
    // figma: Size=md, Variant=Secondary, State=Default, Disabled=False
    "size=md|variant=secondary|disabled=false|state=default": __body11,
    // figma: Size=md, Variant=Secondary, State=Hover, Disabled=False
    "size=md|variant=secondary|disabled=false|state=hover": __body12,
    // figma: Size=md, Variant=Secondary, State=Active, Disabled=False
    "size=md|variant=secondary|disabled=false|state=active": __body11,
    // figma: Size=md, Variant=Outline, State=Active, Disabled=False
    "size=md|variant=outline|disabled=false|state=active": __body13,
    // figma: Size=md, Variant=Secondary, State=Focus, Disabled=False
    "size=md|variant=secondary|disabled=false|state=focus": __body14,
    // figma: Size=md, Variant=Outline, State=Focus, Disabled=False
    "size=md|variant=outline|disabled=false|state=focus": __body15,
    // figma: Size=sm, Variant=Plain, State=Default, Disabled=False
    "size=sm|variant=plain|disabled=false|state=default": __body16,
    // figma: Size=sm, Variant=Plain, State=Hover, Disabled=False
    "size=sm|variant=plain|disabled=false|state=hover": __body17,
    // figma: Size=sm, Variant=Plain, State=Active, Disabled=False
    "size=sm|variant=plain|disabled=false|state=active": __body18,
    // figma: Size=sm, Variant=Plain, State=Focus, Disabled=False
    "size=sm|variant=plain|disabled=false|state=focus": __body19,
    // figma: Size=sm, Variant=Solid, State=Default, Disabled=True
    "size=sm|variant=solid|disabled=true|state=default": __body20,
    // figma: Size=sm, Variant=Solid, State=Default, Disabled=False
    "size=sm|variant=solid|disabled=false|state=default": __body21,
    // figma: Size=sm, Variant=Solid, State=Hover, Disabled=False
    "size=sm|variant=solid|disabled=false|state=hover": __body22,
    // figma: Size=sm, Variant=Solid, State=Active, Disabled=False
    "size=sm|variant=solid|disabled=false|state=active": __body21,
    // figma: Size=sm, Variant=Solid, State=Focus, Disabled=False
    "size=sm|variant=solid|disabled=false|state=focus": __body23,
    // figma: Size=sm, Variant=Secondary, State=Default, Disabled=False
    "size=sm|variant=secondary|disabled=false|state=default": __body24,
    // figma: Size=sm, Variant=Outline, State=Default, Disabled=False
    "size=sm|variant=outline|disabled=false|state=default": __body25,
    // figma: Size=sm, Variant=Secondary, State=Hover, Disabled=False
    "size=sm|variant=secondary|disabled=false|state=hover": __body26,
    // figma: Size=sm, Variant=Outline, State=Hover, Disabled=False
    "size=sm|variant=outline|disabled=false|state=hover": __body27,
    // figma: Size=sm, Variant=Secondary, State=Active, Disabled=False
    "size=sm|variant=secondary|disabled=false|state=active": __body24,
    // figma: Size=sm, Variant=Outline, State=Active, Disabled=False
    "size=sm|variant=outline|disabled=false|state=active": __body28,
    // figma: Size=sm, Variant=Secondary, State=Focus, Disabled=False
    "size=sm|variant=secondary|disabled=false|state=focus": __body29,
    // figma: Size=sm, Variant=Outline, State=Focus, Disabled=False
    "size=sm|variant=outline|disabled=false|state=focus": __body30,
    // figma: Size=lg, Variant=Plain, State=Default, Disabled=False
    "size=lg|variant=plain|disabled=false|state=default": __body31,
    // figma: Size=lg, Variant=Plain, State=Hover, Disabled=False
    "size=lg|variant=plain|disabled=false|state=hover": __body32,
    // figma: Size=lg, Variant=Plain, State=Active, Disabled=False
    "size=lg|variant=plain|disabled=false|state=active": __body33,
    // figma: Size=lg, Variant=Plain, State=Focus, Disabled=False
    "size=lg|variant=plain|disabled=false|state=focus": __body34,
    // figma: Size=lg, Variant=Solid, State=Default, Disabled=True
    "size=lg|variant=solid|disabled=true|state=default": __body35,
    // figma: Size=lg, Variant=Solid, State=Default, Disabled=False
    "size=lg|variant=solid|disabled=false|state=default": __body36,
    // figma: Size=lg, Variant=Solid, State=Hover, Disabled=False
    "size=lg|variant=solid|disabled=false|state=hover": __body37,
    // figma: Size=lg, Variant=Solid, State=Active, Disabled=False
    "size=lg|variant=solid|disabled=false|state=active": __body36,
    // figma: Size=lg, Variant=Solid, State=Focus, Disabled=False
    "size=lg|variant=solid|disabled=false|state=focus": __body38,
    // figma: Size=lg, Variant=Secondary, State=Default, Disabled=False
    "size=lg|variant=secondary|disabled=false|state=default": __body39,
    // figma: Size=lg, Variant=Outline, State=Default, Disabled=False
    "size=lg|variant=outline|disabled=false|state=default": __body40,
    // figma: Size=lg, Variant=Secondary, State=Hover, Disabled=False
    "size=lg|variant=secondary|disabled=false|state=hover": __body41,
    // figma: Size=lg, Variant=Outline, State=Hover, Disabled=False
    "size=lg|variant=outline|disabled=false|state=hover": __body42,
    // figma: Size=lg, Variant=Secondary, State=Active, Disabled=False
    "size=lg|variant=secondary|disabled=false|state=active": __body39,
    // figma: Size=lg, Variant=Outline, State=Active, Disabled=False
    "size=lg|variant=outline|disabled=false|state=active": __body43,
    // figma: Size=lg, Variant=Secondary, State=Focus, Disabled=False
    "size=lg|variant=secondary|disabled=false|state=focus": __body44,
    // figma: Size=lg, Variant=Outline, State=Focus, Disabled=False
    "size=lg|variant=outline|disabled=false|state=focus": __body45,
    // figma: Size=xl, Variant=Plain, State=Default, Disabled=False
    "size=xl|variant=plain|disabled=false|state=default": __body46,
    // figma: Size=xl, Variant=Plain, State=Hover, Disabled=False
    "size=xl|variant=plain|disabled=false|state=hover": __body47,
    // figma: Size=xl, Variant=Plain, State=Active, Disabled=False
    "size=xl|variant=plain|disabled=false|state=active": __body48,
    // figma: Size=xl, Variant=Plain, State=Focus, Disabled=False
    "size=xl|variant=plain|disabled=false|state=focus": __body49,
    // figma: Size=xl, Variant=Solid, State=Default, Disabled=True
    "size=xl|variant=solid|disabled=true|state=default": __body50,
    // figma: Size=xl, Variant=Solid, State=Default, Disabled=False
    "size=xl|variant=solid|disabled=false|state=default": __body51,
    // figma: Size=xl, Variant=Solid, State=Hover, Disabled=False
    "size=xl|variant=solid|disabled=false|state=hover": __body52,
    // figma: Size=xl, Variant=Solid, State=Active, Disabled=False
    "size=xl|variant=solid|disabled=false|state=active": __body51,
    // figma: Size=xl, Variant=Solid, State=Focus, Disabled=False
    "size=xl|variant=solid|disabled=false|state=focus": __body53,
    // figma: Size=xl, Variant=Secondary, State=Default, Disabled=False
    "size=xl|variant=secondary|disabled=false|state=default": __body54,
    // figma: Size=xl, Variant=Outline, State=Default, Disabled=False
    "size=xl|variant=outline|disabled=false|state=default": __body55,
    // figma: Size=xl, Variant=Secondary, State=Hover, Disabled=False
    "size=xl|variant=secondary|disabled=false|state=hover": __body56,
    // figma: Size=xl, Variant=Outline, State=Hover, Disabled=False
    "size=xl|variant=outline|disabled=false|state=hover": __body57,
    // figma: Size=xl, Variant=Secondary, State=Active, Disabled=False
    "size=xl|variant=secondary|disabled=false|state=active": __body54,
    // figma: Size=xl, Variant=Outline, State=Active, Disabled=False
    "size=xl|variant=outline|disabled=false|state=active": __body58,
    // figma: Size=xl, Variant=Secondary, State=Focus, Disabled=False
    "size=xl|variant=secondary|disabled=false|state=focus": __body59,
    // figma: Size=xl, Variant=Outline, State=Focus, Disabled=False
    "size=xl|variant=outline|disabled=false|state=focus": __body60
  };
  const __el = (__impls[__vkey(props)] ?? __body21)();
  // Muted state: same white/orange palette, lower emphasis — not disabled, not grey/black.
  return props.muted ? React.cloneElement(__el, {
    style: {
      ...__el.props.style,
      opacity: 0.55
    }
  }) : __el;
}
Object.assign(__ds_scope, { Button2, __ds_default_components_actions_Button2_4dasbs: Button2 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button2.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/HelpCircle.jsx
try { (() => {
// figma node: 1:391 help-circle
function HelpCircle(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--icon-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 22,
    height: 22,
    viewBox: "0 0 22 22",
    fill: "none",
    style: {
      position: "absolute",
      left: 1,
      top: 1,
      width: 22,
      height: 22
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2 11 C 2 6.029 6.029 2 11 2 M 11 20 C 6.029 20 2 15.971 2 11 M 20 11 C 20 15.971 15.971 20 11 20 M 11 2 C 15.971 2 20 6.029 20 11 Z M 11 0 C 4.925 0 0 4.925 0 11 M 22 11 C 22 4.925 17.075 0 11 0 M 11 22 C 17.075 22 22 17.075 22 11 M 0 11 C 0 17.075 4.925 22 11 22 Z M 9.907 7.271 C 10.314 7.032 10.793 6.944 11.258 7.024 M 9.033 8.332 C 9.19 7.886 9.499 7.511 9.907 7.271 M 7.758 8.943 C 8.279 9.127 8.85 8.853 9.033 8.332 M 7.147 7.668 C 6.963 8.189 7.237 8.76 7.758 8.943 M 8.893 5.547 C 8.079 6.026 7.46 6.777 7.147 7.668 M 11.596 5.053 C 10.665 4.893 9.708 5.068 8.893 5.547 M 13.98 6.42 C 13.372 5.697 12.527 5.213 11.596 5.053 M 14.92 9.001 C 14.921 8.056 14.588 7.142 13.98 6.42 M 12.975 12.082 C 13.785 11.542 14.92 10.531 14.92 9.001 M 11.795 12.726 C 12.111 12.586 12.539 12.372 12.975 12.082 M 11.405 12.888 C 11.502 12.851 11.636 12.797 11.795 12.726 M 11.289 12.93 C 11.317 12.92 11.357 12.906 11.405 12.888 M 11.254 12.943 L 11.289 12.93 M 11.243 12.946 L 11.254 12.943 M 11.239 12.948 L 11.243 12.946 M 11.237 12.948 L 11.239 12.948 M 10.92 12 C 11.236 12.949 11.237 12.948 11.237 12.948 M 11.236 12.949 L 10.92 12 M 9.971 12.316 C 10.146 12.84 10.712 13.123 11.236 12.949 M 10.603 11.051 C 10.08 11.226 9.797 11.792 9.971 12.316 M 10.619 11.046 L 10.603 11.051 M 10.693 11.019 C 10.659 11.031 10.634 11.041 10.619 11.046 M 10.983 10.899 C 10.861 10.953 10.76 10.993 10.693 11.019 M 11.865 10.418 C 11.551 10.628 11.229 10.789 10.983 10.899 M 12.92 9 C 12.92 9.469 12.555 9.958 11.865 10.418 M 12.92 8.999 L 12.92 9 M 12.45 7.708 C 12.754 8.069 12.921 8.526 12.92 8.999 M 11.258 7.024 C 11.724 7.104 12.146 7.346 12.45 7.708 Z M 11 15 C 10.448 15 10 15.448 10 16 M 11.01 15 L 11 15 M 12.01 16 C 12.01 15.448 11.562 15 11.01 15 M 11.01 17 C 11.562 17 12.01 16.552 12.01 16 M 11 17 L 11.01 17 M 10 16 C 10 16.552 10.448 17 11 17 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { HelpCircle, __ds_default_components_glyphs_HelpCircle_s188vv: HelpCircle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/HelpCircle.jsx", error: String((e && e.message) || e) }); }

// components/forms/Label.jsx
try { (() => {
// figma node: 1:287 label (2 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "disabled=" + __venc(p.disabled);
function Label(_p = {}) {
  const props = {
    ..._p,
    required: _p.required ?? false,
    disabled: _p.disabled ?? false,
    optionalText: _p.optionalText ?? false,
    text: _p.text ?? "Label",
    optionalText2: _p.optionalText2 ?? "(Optional)",
    helpIcon: _p.helpIcon ?? false
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      color: "var(--icon-error)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.text), props.helpIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.HelpCircle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), props.required && /*#__PURE__*/React.createElement("svg", {
    width: 6,
    height: 6,
    viewBox: "0 0 6 6",
    fill: "none",
    style: {
      position: "absolute",
      left: -6,
      top: 0,
      width: 6,
      height: 6
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.413 6 L 2.516 3.802 L 0.59 4.995 L 0 4.005 L 2.045 3 L 0 1.995 L 0.59 1.005 L 2.516 2.198 L 2.413 0 L 3.587 0 L 3.484 2.198 L 5.41 1.005 L 6 1.995 L 3.955 3 L 6 4.005 L 5.41 4.995 L 3.484 3.802 L 3.587 6 L 2.413 6 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), props.optionalText && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.optionalText2));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      color: "var(--icon-error)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-disabled)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.text), props.helpIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      height: 16,
      flexShrink: 0,
      color: "var(--icon-disabled)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.HelpCircle, {
    style: {
      transform: "scale(0.667, 0.667)",
      transformOrigin: "0 0"
    }
  })), props.required && /*#__PURE__*/React.createElement("svg", {
    width: 6,
    height: 6,
    viewBox: "0 0 6 6",
    fill: "none",
    style: {
      position: "absolute",
      left: -6,
      top: 0,
      width: 6,
      height: 6
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 2.413 6 L 2.516 3.802 L 0.59 4.995 L 0 4.005 L 2.045 3 L 0 1.995 L 0.59 1.005 L 2.516 2.198 L 2.413 0 L 3.587 0 L 3.484 2.198 L 5.41 1.005 L 6 1.995 L 3.955 3 L 6 4.005 L 5.41 4.995 L 3.484 3.802 L 3.587 6 L 2.413 6 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })), props.optionalText && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.optionalText2));
  const __impls = {
    // figma: Disabled=False
    "disabled=false": __body0,
    // figma: Disabled=True
    "disabled=true": __body1
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
Object.assign(__ds_scope, { Label, __ds_default_components_forms_Label_juae40: Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Label.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/HxHome02.jsx
try { (() => {
// figma node: 173:3854 hx_home-02
function HxHome02(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "inherit",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 20.000,
    height: 20.733,
    viewBox: "0 0 20.000 20.733",
    fill: "none",
    style: {
      position: "absolute",
      left: 2,
      top: 1.267,
      width: 20,
      height: 20.733
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 10.523 0.07 C 10.181 -0.023 9.82 -0.023 9.477 0.07 M 11.522 0.649 C 11.255 0.44 10.92 0.177 10.523 0.07 M 11.596 0.708 C 11.572 0.689 11.547 0.669 11.522 0.649 M 18.379 5.983 L 11.596 0.708 M 18.456 6.043 C 18.431 6.023 18.405 6.003 18.379 5.983 M 19.412 6.927 C 19.165 6.593 18.833 6.336 18.456 6.043 M 19.889 7.903 C 19.791 7.551 19.629 7.221 19.412 6.927 M 20 9.2 C 20.001 8.723 20.001 8.303 19.889 7.903 M 20 9.298 C 20 9.265 20 9.232 20 9.2 M 20 16.572 L 20 9.298 M 19.97 17.928 C 20 17.554 20 17.099 20 16.572 M 19.673 19.095 C 19.866 18.717 19.937 18.324 19.97 17.928 M 18.362 20.406 C 18.927 20.119 19.386 19.66 19.673 19.095 M 17.195 20.703 C 17.591 20.67 17.984 20.599 18.362 20.406 M 15.839 20.733 C 16.366 20.733 16.821 20.733 17.195 20.703 M 4.162 20.733 L 15.839 20.733 M 2.805 20.703 C 3.18 20.733 3.634 20.733 4.162 20.733 M 1.638 20.406 C 2.017 20.599 2.41 20.67 2.805 20.703 M 0.327 19.095 C 0.615 19.66 1.074 20.119 1.638 20.406 M 0.031 17.928 C 0.063 18.324 0.134 18.717 0.327 19.095 M 0 16.572 C 0 17.099 0 17.554 0.031 17.928 M 0 9.298 L 0 16.572 M 0 9.2 C 0 9.232 0 9.265 0 9.298 M 0.111 7.903 C -0.001 8.303 0 8.723 0 9.2 M 0.588 6.927 C 0.371 7.221 0.21 7.551 0.111 7.903 M 1.544 6.043 C 1.167 6.336 0.835 6.593 0.588 6.927 M 1.622 5.983 C 1.595 6.003 1.57 6.023 1.544 6.043 M 8.404 0.708 L 1.622 5.983 M 8.479 0.649 C 8.453 0.669 8.428 0.689 8.404 0.708 M 9.477 0.07 C 9.08 0.177 8.746 0.44 8.479 0.649 Z M 12 18.733 L 8 18.733 M 12 12.333 L 12 18.733 M 11.99 11.758 C 11.999 11.874 12 12.037 12 12.333 M 11.989 11.745 C 11.989 11.749 11.989 11.753 11.99 11.758 M 11.976 11.743 C 11.98 11.744 11.985 11.744 11.989 11.745 M 11.4 11.733 C 11.697 11.733 11.859 11.734 11.976 11.743 M 8.6 11.733 L 11.4 11.733 M 8.025 11.743 C 8.141 11.734 8.304 11.733 8.6 11.733 M 8.012 11.745 C 8.016 11.744 8.02 11.744 8.025 11.743 M 8.01 11.758 C 8.011 11.753 8.011 11.749 8.012 11.745 M 8 12.333 C 8 12.037 8.001 11.874 8.01 11.758 M 8 18.733 L 8 12.333 Z M 14 18.733 L 14 12.301 C 14 12.049 14 11.803 13.983 11.595 C 13.965 11.366 13.92 11.097 13.782 10.825 C 13.59 10.449 13.284 10.143 12.908 9.951 C 12.637 9.813 12.367 9.769 12.138 9.75 C 11.93 9.733 11.684 9.733 11.432 9.733 L 8.568 9.733 C 8.316 9.733 8.07 9.733 7.862 9.75 C 7.633 9.769 7.364 9.813 7.092 9.951 C 6.716 10.143 6.41 10.449 6.218 10.825 C 6.08 11.097 6.036 11.366 6.017 11.595 C 6 11.803 6 12.049 6 12.301 L 6 18.733 L 4.2 18.733 C 3.624 18.733 3.251 18.732 2.968 18.709 C 2.696 18.687 2.596 18.649 2.546 18.624 C 2.358 18.528 2.205 18.375 2.109 18.187 C 2.084 18.138 2.046 18.037 2.024 17.765 C 2.001 17.482 2 17.11 2 16.533 L 2 9.298 C 2 8.667 2.009 8.543 2.037 8.442 C 2.07 8.325 2.124 8.214 2.196 8.117 C 2.259 8.032 2.351 7.949 2.849 7.562 L 9.632 2.287 C 9.819 2.141 9.918 2.065 9.993 2.015 C 9.995 2.013 9.998 2.011 10 2.01 C 10.002 2.011 10.005 2.013 10.007 2.015 C 10.083 2.065 10.182 2.141 10.369 2.287 L 17.151 7.562 C 17.649 7.949 17.742 8.032 17.804 8.117 C 17.876 8.214 17.93 8.325 17.963 8.442 C 17.991 8.543 18 8.667 18 9.298 L 18 16.533 C 18 17.11 17.999 17.482 17.976 17.765 C 17.954 18.037 17.916 18.138 17.891 18.187 C 17.795 18.375 17.642 18.528 17.454 18.624 C 17.405 18.649 17.304 18.687 17.032 18.709 C 16.749 18.732 16.377 18.733 15.8 18.733 L 14 18.733 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { HxHome02, __ds_default_components_glyphs_HxHome02_ho3mh7: HxHome02 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/HxHome02.jsx", error: String((e && e.message) || e) }); }

// components/actions/NavButton.jsx
try { (() => {
// figma node: 173:3857 Nav Button (2 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "property1=" + __venc(p.property1);
function NavButton(_p = {}) {
  const props = {
    ..._p,
    navName: _p.navName ?? "Home",
    property1: _p.property1 ?? "default"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 124,
      display: "flex",
      flexDirection: "column",
      gap: 1,
      padding: "8px 4px 8px 4px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 124,
      height: 61,
      borderRadius: 100,
      backgroundColor: "var(--icon-on-action)",
      boxShadow: "inset 0 0 0 0.400px var(--border-light), 0px 4px 4px 0px rgba(0,0,0,0.25)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0,
      color: "var(--icon-information)"
    }
  }, props.navIcon ?? /*#__PURE__*/React.createElement(__ds_scope.HxHome02, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      textAlign: "center",
      lineHeight: "20px",
      color: "var(--text-action)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.navName));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 124,
      display: "flex",
      flexDirection: "column",
      gap: 1,
      padding: "8px 4px 8px 4px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0,
      color: "var(--icon-information)"
    }
  }, props.navIcon ?? /*#__PURE__*/React.createElement(__ds_scope.HxHome02, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      textAlign: "center",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, props.navName));
  const __impls = {
    // figma: Property 1=Selected
    "property1=selected": __body0,
    // figma: Property 1=Default
    "property1=default": __body1
  };
  return (__impls[__vkey(props)] ?? __body1)();
}
Object.assign(__ds_scope, { NavButton, __ds_default_components_actions_NavButton_9wv1ob: NavButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/NavButton.jsx", error: String((e && e.message) || e) }); }

// components/actions/BottomNavBar.jsx
try { (() => {
// figma node: 173:3868 Bottom Nav Bar
function BottomNavBar(_p = {}) {
  const props = {
    ..._p,
    showEvaluation: _p.showEvaluation ?? true
  };
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 388,
      height: 76,
      borderRadius: 40,
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 8px 12px 8px",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.NavButton, {
    style: {
      position: "relative",
      flexGrow: 1,
      width: "auto"
    },
    property1: "selected"
  }), props.showEvaluation && /*#__PURE__*/React.createElement(__ds_scope.NavButton, {
    style: {
      position: "relative",
      flexGrow: 1,
      width: "auto"
    },
    navName: "Evaluation",
    property1: "default"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 1,
      padding: "8px 4px 8px 4px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 20.000,
    height: 20.733,
    viewBox: "0 0 20.000 20.733",
    fill: "none",
    style: {
      position: "absolute",
      left: 2,
      top: 1.267,
      width: 20,
      height: 20.733
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 9.477 0.07 C 9.82 -0.023 10.181 -0.023 10.523 0.07 C 10.92 0.177 11.255 0.44 11.522 0.649 C 11.547 0.669 11.572 0.689 11.596 0.708 L 18.379 5.983 C 18.405 6.003 18.431 6.023 18.456 6.043 C 18.833 6.336 19.165 6.593 19.412 6.927 C 19.629 7.221 19.791 7.551 19.889 7.903 C 20.001 8.303 20.001 8.723 20 9.2 C 20 9.232 20 9.265 20 9.298 L 20 16.572 C 20 17.099 20 17.554 19.97 17.928 C 19.937 18.324 19.866 18.717 19.673 19.095 C 19.386 19.66 18.927 20.119 18.362 20.406 C 17.984 20.599 17.591 20.67 17.195 20.703 C 16.821 20.733 16.366 20.733 15.839 20.733 L 4.162 20.733 C 3.634 20.733 3.18 20.733 2.805 20.703 C 2.41 20.67 2.017 20.599 1.638 20.406 C 1.074 20.119 0.615 19.66 0.327 19.095 C 0.134 18.717 0.063 18.324 0.031 17.928 C 0 17.554 0 17.099 0 16.572 L 0 9.298 C 0 9.265 0 9.232 0 9.2 C 0 8.723 -0.001 8.303 0.111 7.903 C 0.21 7.551 0.371 7.221 0.588 6.927 C 0.835 6.593 1.167 6.336 1.544 6.043 C 1.57 6.023 1.595 6.003 1.622 5.983 L 8.404 0.708 C 8.428 0.689 8.453 0.669 8.479 0.649 C 8.746 0.44 9.08 0.177 9.477 0.07 Z M 8 18.733 L 12 18.733 L 12 12.333 C 12 12.037 11.999 11.874 11.99 11.758 C 11.989 11.753 11.989 11.749 11.989 11.745 C 11.985 11.744 11.98 11.744 11.976 11.743 C 11.859 11.734 11.697 11.733 11.4 11.733 L 8.6 11.733 C 8.304 11.733 8.141 11.734 8.025 11.743 C 8.02 11.744 8.016 11.744 8.012 11.745 C 8.011 11.749 8.011 11.753 8.01 11.758 C 8.001 11.874 8 12.037 8 12.333 L 8 18.733 Z M 14 18.733 L 14 12.301 C 14 12.049 14 11.803 13.983 11.595 C 13.965 11.366 13.92 11.097 13.782 10.825 C 13.59 10.449 13.284 10.143 12.908 9.951 C 12.637 9.813 12.367 9.769 12.138 9.75 C 11.93 9.733 11.684 9.733 11.432 9.733 L 8.568 9.733 C 8.316 9.733 8.07 9.733 7.862 9.75 C 7.633 9.769 7.364 9.813 7.092 9.951 C 6.716 10.143 6.41 10.449 6.218 10.825 C 6.08 11.097 6.036 11.366 6.017 11.595 C 6 11.803 6 12.049 6 12.301 L 6 18.733 L 4.2 18.733 C 3.624 18.733 3.251 18.732 2.968 18.709 C 2.696 18.687 2.596 18.649 2.546 18.624 C 2.358 18.528 2.205 18.375 2.109 18.187 C 2.084 18.138 2.046 18.037 2.024 17.765 C 2.001 17.482 2 17.11 2 16.533 L 2 9.298 C 2 8.667 2.009 8.543 2.037 8.442 C 2.07 8.325 2.124 8.214 2.196 8.117 C 2.259 8.032 2.351 7.949 2.849 7.562 L 9.632 2.287 C 9.819 2.141 9.918 2.065 9.993 2.015 C 9.995 2.013 9.998 2.011 10 2.01 C 10.002 2.011 10.005 2.013 10.007 2.015 C 10.083 2.065 10.182 2.141 10.369 2.287 L 17.151 7.562 C 17.649 7.949 17.742 8.032 17.804 8.117 C 17.876 8.214 17.93 8.325 17.963 8.442 C 17.991 8.543 18 8.667 18 9.298 L 18 16.533 C 18 17.11 17.999 17.482 17.976 17.765 C 17.954 18.037 17.916 18.138 17.891 18.187 C 17.795 18.375 17.642 18.528 17.454 18.624 C 17.405 18.649 17.304 18.687 17.032 18.709 C 16.749 18.732 16.377 18.733 15.8 18.733 L 14 18.733 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      textAlign: "center",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, "Live HPC")));
}
Object.assign(__ds_scope, { BottomNavBar, __ds_default_components_actions_BottomNavBar_1xh56dl: BottomNavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/BottomNavBar.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/HxTrendUp01Filled.jsx
try { (() => {
// figma node: 173:3405 hx_trend-up-01-filled
function HxTrendUp01Filled(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      position: "relative",
      color: "rgb(0,0,0)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 22,
    height: 12,
    viewBox: "0 0 22 12",
    fill: "none",
    style: {
      position: "absolute",
      left: 1,
      top: 6,
      width: 22,
      height: 12
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 13 1 C 13 0.448 13.448 0 14 0 M 14 2 C 13.448 2 13 1.552 13 1 M 18.586 2 L 14 2 M 12.424 8.162 L 18.586 2 M 12.01 8.561 C 12.099 8.485 12.215 8.371 12.424 8.162 M 12 8.57 L 12.01 8.561 M 11.99 8.561 L 12 8.57 M 11.576 8.162 C 11.785 8.371 11.901 8.485 11.99 8.561 M 8.816 5.402 L 11.576 8.162 M 8.304 4.914 C 8.464 5.049 8.637 5.223 8.816 5.402 M 7.618 4.512 C 7.908 4.606 8.13 4.766 8.304 4.914 M 6.382 4.512 C 6.784 4.382 7.216 4.382 7.618 4.512 M 5.696 4.914 C 5.87 4.766 6.092 4.606 6.382 4.512 M 5.184 5.402 C 5.363 5.223 5.536 5.049 5.696 4.914 M 0.293 10.293 L 5.184 5.402 M 0.293 11.707 C -0.098 11.317 -0.098 10.683 0.293 10.293 M 1.707 11.707 C 1.317 12.098 0.683 12.098 0.293 11.707 M 6.576 6.838 L 1.707 11.707 M 6.99 6.439 C 6.901 6.515 6.785 6.629 6.576 6.838 M 7 6.43 L 6.99 6.439 M 7.01 6.439 L 7 6.43 M 7.424 6.838 C 7.215 6.629 7.099 6.515 7.01 6.439 M 10.184 9.598 L 7.424 6.838 M 10.696 10.086 C 10.536 9.951 10.363 9.777 10.184 9.598 M 11.382 10.488 C 11.092 10.394 10.87 10.234 10.696 10.086 M 12.618 10.488 C 12.216 10.618 11.784 10.618 11.382 10.488 M 13.304 10.086 C 13.13 10.234 12.908 10.394 12.618 10.488 M 13.816 9.598 C 13.637 9.777 13.464 9.951 13.304 10.086 M 20 3.414 L 13.816 9.598 M 20 8 L 20 3.414 M 21 9 C 20.448 9 20 8.552 20 8 M 22 8 C 22 8.552 21.552 9 21 9 M 22 1 L 22 8 M 21 0 C 21.552 0 22 0.448 22 1 M 14 0 L 21 0 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })));
}
Object.assign(__ds_scope, { HxTrendUp01Filled, __ds_default_components_glyphs_HxTrendUp01Filled_1kfni2b: HxTrendUp01Filled });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/HxTrendUp01Filled.jsx", error: String((e && e.message) || e) }); }

// components/accordions/ChartAccordion.jsx
try { (() => {
// figma node: 173:3519 Chart Accordion (4 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "property1=" + __venc(p.property1);
function ChartAccordion(_p = {}) {
  const props = {
    ..._p,
    title: _p.title ?? "FA Performance Trend",
    property1: _p.property1 ?? "fa expanded"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "12px 16px 12px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.BarChart07, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 16,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexShrink: 0
    }
  }, props.text1 ?? "FA Performance")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "28px",
      color: "var(--text-success)",
      flexShrink: 0
    }
  }, props.text2 ?? "95% "), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0,
      color: "var(--icon-success)"
    }
  }, props.icon2 ?? /*#__PURE__*/React.createElement(__ds_scope.HxTrendUp01Filled, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-brand-secondary)",
      flexShrink: 0
    }
  }, props.text3 ?? "Overall"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 4,
      height: 4,
      borderRadius: "50%",
      backgroundColor: "rgb(100,116,139)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, props.text4 ?? "Updated on 01/01/25")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 324,
      top: 32,
      width: 24,
      height: 24
    }
  }, props.icon3 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDownFilled, null))));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "12px 16px 12px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.BarChart07, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 16,
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexGrow: 1,
      whiteSpace: "nowrap"
    }
  }, props.text1 ?? "SA Performance")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "28px",
      color: "var(--text-success)",
      flexShrink: 0
    }
  }, props.text2 ?? "95% "), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0,
      color: "var(--icon-success)"
    }
  }, props.icon2 ?? /*#__PURE__*/React.createElement(__ds_scope.HxTrendUp01Filled, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-brand-secondary)",
      flexShrink: 0
    }
  }, props.text3 ?? "Overall"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 4,
      height: 4,
      borderRadius: "50%",
      backgroundColor: "rgb(100,116,139)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, props.text4 ?? "Updated on 01/01/25")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 324,
      top: 32,
      width: 24,
      height: 24
    }
  }, props.icon3 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDownFilled, null))));
  const __body2 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "12px 16px 12px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "rgba(28,28,28,0.16)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.BarChart07, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 16,
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexGrow: 1,
      whiteSpace: "nowrap"
    }
  }, props.text1 ?? "FA Performance")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "28px",
      color: "var(--text-success)",
      flexShrink: 0
    }
  }, props.text2 ?? "95% "), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0,
      color: "var(--icon-success)"
    }
  }, props.icon2 ?? /*#__PURE__*/React.createElement(__ds_scope.HxTrendUp01Filled, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-brand-secondary)",
      flexShrink: 0
    }
  }, props.text3 ?? "Overall"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 4,
      height: 4,
      borderRadius: "50%",
      backgroundColor: "rgb(100,116,139)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, props.text4 ?? "Updated on 01/01/25")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 324,
      top: 32,
      width: 24,
      height: 24
    }
  }, props.icon3 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronUp, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 24,
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 180,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "100"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "80"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "60"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "40"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "20")), /*#__PURE__*/React.createElement("svg", {
    width: 292,
    height: 1,
    viewBox: "0 -0.500 292 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 178,
      width: 292,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.5 L 0 0 L 292 0 L 292 -0.5 L 292 -1 L 0 -1 L 0 -0.5 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 292,
    height: 1,
    viewBox: "0 -0.500 292 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 136,
      width: 292,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.5 L 0 0 L 292 0 L 292 -0.5 L 292 -1 L 0 -1 L 0 -0.5 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 292,
    height: 1,
    viewBox: "0 -0.500 292 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 94,
      width: 292,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.5 L 0 0 L 292 0 L 292 -0.5 L 292 -1 L 0 -1 L 0 -0.5 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 292,
    height: 1,
    viewBox: "0 -0.500 292 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 52,
      width: 292,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.5 L 0 0 L 292 0 L 292 -0.5 L 292 -1 L 0 -1 L 0 -0.5 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 292,
    height: 1,
    viewBox: "0 -0.500 292 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 10,
      width: 292,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.5 L 0 0 L 292 0 L 292 -0.5 L 292 -1 L 0 -1 L 0 -0.5 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 24,
      top: 0.003,
      width: 292,
      height: 178
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 12,
      top: 0,
      width: 16,
      height: 178,
      opacity: 0.3,
      borderRadius: "16px 16px 0px 0px",
      backgroundColor: "rgba(28,28,28,0.4)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 96,
      top: 83,
      width: 16,
      height: 95,
      opacity: 0.3,
      borderRadius: "16px 16px 0px 0px",
      backgroundColor: "rgba(28,28,28,0.4)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 180,
      top: 23,
      width: 16,
      height: 155,
      borderRadius: "16px 16px 0px 0px",
      backgroundColor: "var(--icon-information)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 123,
      top: 157,
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "rgb(255,255,255)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 268,
      top: 117,
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "rgb(255,255,255)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 188,
      top: -7,
      width: 48,
      height: 30,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      padding: "2px 15px 2px 15px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 48,
      height: 30,
      borderRadius: "15px 15px 15px 0px",
      backgroundColor: "var(--icon-information)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, "95%")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 62,
      padding: "0px 12px 0px 36px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "FA1"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "FA2"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "FA3"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "FA4"))));
  const __body3 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "12px 16px 12px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "rgba(28,28,28,0.16)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.BarChart07, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 16,
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexGrow: 1,
      whiteSpace: "nowrap"
    }
  }, props.text1 ?? "SA Performance")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "28px",
      color: "var(--text-success)",
      flexShrink: 0
    }
  }, props.text2 ?? "95% "), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0,
      color: "var(--icon-success)"
    }
  }, props.icon2 ?? /*#__PURE__*/React.createElement(__ds_scope.HxTrendUp01Filled, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-brand-secondary)",
      flexShrink: 0
    }
  }, props.text3 ?? "Overall"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 4,
      height: 4,
      borderRadius: "50%",
      backgroundColor: "rgb(100,116,139)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, props.text4 ?? "Updated on 01/01/25")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 324,
      top: 32,
      width: 24,
      height: 24
    }
  }, props.icon3 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronUp, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 24,
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 180,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "100"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "80"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "60"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "40"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "20")), /*#__PURE__*/React.createElement("svg", {
    width: 292,
    height: 1,
    viewBox: "0 -0.500 292 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 178,
      width: 292,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.5 L 0 0 L 292 0 L 292 -0.5 L 292 -1 L 0 -1 L 0 -0.5 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 292,
    height: 1,
    viewBox: "0 -0.500 292 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 136,
      width: 292,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.5 L 0 0 L 292 0 L 292 -0.5 L 292 -1 L 0 -1 L 0 -0.5 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 292,
    height: 1,
    viewBox: "0 -0.500 292 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 94,
      width: 292,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.5 L 0 0 L 292 0 L 292 -0.5 L 292 -1 L 0 -1 L 0 -0.5 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 292,
    height: 1,
    viewBox: "0 -0.500 292 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 52,
      width: 292,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.5 L 0 0 L 292 0 L 292 -0.5 L 292 -1 L 0 -1 L 0 -0.5 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("svg", {
    width: 292,
    height: 1,
    viewBox: "0 -0.500 292 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 24,
      top: 10,
      width: 292,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 -0.5 L 0 0 L 292 0 L 292 -0.5 L 292 -1 L 0 -1 L 0 -0.5 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 24,
      top: 0.003,
      width: 292,
      height: 178
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 12,
      top: 0,
      width: 16,
      height: 178,
      opacity: 0.3,
      borderRadius: "16px 16px 0px 0px",
      backgroundColor: "rgba(28,28,28,0.4)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 96,
      top: 83,
      width: 16,
      height: 95,
      opacity: 0.3,
      borderRadius: "16px 16px 0px 0px",
      backgroundColor: "rgba(28,28,28,0.4)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 180,
      top: 23,
      width: 16,
      height: 155,
      borderRadius: "16px 16px 0px 0px",
      backgroundColor: "var(--icon-information)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 123,
      top: 157,
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "rgb(255,255,255)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 268,
      top: 117,
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "rgb(255,255,255)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 188,
      top: -7,
      width: 48,
      height: 30,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      padding: "2px 15px 2px 15px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 48,
      height: 30,
      borderRadius: "15px 15px 15px 0px",
      backgroundColor: "var(--icon-information)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-on-action)",
      flexShrink: 0
    }
  }, "95%")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      padding: "0px 40px 0px 36px",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "SA1"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "SA2"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "SA3"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      textAlign: "center",
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgba(28,28,28,0.64)",
      flexShrink: 0
    }
  }, "SA4"))));
  const __impls = {
    // figma: Property 1=FA Colapsed
    "property1=fa colapsed": __body0,
    // figma: Property 1=SA Collapsed
    "property1=sa collapsed": __body1,
    // figma: Property 1=FA Expanded
    "property1=fa expanded": __body2,
    // figma: Property 1=SA Expanded
    "property1=sa expanded": __body3
  };
  return (__impls[__vkey(props)] ?? __body2)();
}
Object.assign(__ds_scope, { ChartAccordion, __ds_default_components_accordions_ChartAccordion_nmxxqq: ChartAccordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/accordions/ChartAccordion.jsx", error: String((e && e.message) || e) }); }

// components/accordions/ListAccordion.jsx
try { (() => {
// figma node: 173:3412 List Accordion (2 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "property1=" + __venc(p.property1);
function ListAccordion(_p = {}) {
  const props = {
    ..._p,
    property1: _p.property1 ?? "default"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "12px 16px 12px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "var(--border-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-8c2c552d26cd02be-af5865bd",
    style: {
      position: "relative",
      width: 52,
      height: 48,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 195,
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-success)",
      flexShrink: 0
    }
  }, props.text1 ?? "85%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0,
      color: "var(--icon-success)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.HxTrendUp01Filled, null))), /*#__PURE__*/React.createElement("svg", {
    width: 24,
    height: 1,
    viewBox: "0 -0.500 24 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,77,24)",
      transformOrigin: "0 0",
      width: 24,
      height: 1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 24 0 L 24 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 24 0.5 L 24 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexShrink: 0
    }
  }, props.text2 ?? "98/110 Days"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 7,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, props.text3 ?? "Updated on 01/01/25")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }, props.icon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDownFilled, null))));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 380,
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "var(--surface-page)",
      boxShadow: "inset 0 0 0 1px var(--border-light)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "12px 16px 12px 16px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "var(--border-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-asset-8c2c552d26cd02be-af5865bd",
    style: {
      position: "relative",
      width: 52,
      height: 48,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 195,
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-success)",
      flexShrink: 0
    }
  }, props.text1 ?? "85%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0,
      color: "var(--icon-success)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.HxTrendUp01Filled, null))), /*#__PURE__*/React.createElement("svg", {
    width: 24,
    height: 1,
    viewBox: "0 -0.500 24 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,77,24)",
      transformOrigin: "0 0",
      width: 24,
      height: 1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 24 0 L 24 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 24 0.5 L 24 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-headings-2)",
      flexShrink: 0
    }
  }, props.text2 ?? "98/110 Days"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 7,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 13,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexShrink: 0
    }
  }, props.text3 ?? "Updated on 01/01/25")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0
    }
  }, props.icon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronUp, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: "var(--surface-page)",
      borderTop: "1px solid rgba(226,232,240,0.5)",
      borderRight: "1px solid rgba(226,232,240,0.5)",
      borderBottom: "0.600px solid rgba(226,232,240,0.5)",
      borderLeft: "1px solid rgba(226,232,240,0.5)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "8px 16px 8px 24px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 324,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 132,
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: "20px",
      color: "var(--text-headings-2)",
      flexShrink: 0,
      whiteSpace: "nowrap"
    }
  }, props.text4 ?? "January")), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 1,
    viewBox: "0 -0.500 16 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,89,20)",
      transformOrigin: "0 0",
      width: 16,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16 0 L 16 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 16 0.5 L 16 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-success)",
      flexShrink: 0
    }
  }, "85%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 67,
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--muted-2)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 12,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, "21/25 days"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 10.500,
    height: 10.500,
    viewBox: "0 0 10.500 10.500",
    fill: "none",
    style: {
      position: "absolute",
      left: 3.75,
      top: 3.75,
      width: 10.5,
      height: 10.5,
      color: "var(--icon-muted)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.22 0.22 C 0.513 -0.073 0.987 -0.073 1.28 0.22 L 5.25 4.189 L 9.22 0.22 C 9.513 -0.073 9.987 -0.073 10.28 0.22 C 10.573 0.513 10.573 0.987 10.28 1.28 L 6.311 5.25 L 10.28 9.22 C 10.573 9.513 10.573 9.987 10.28 10.28 C 9.987 10.573 9.513 10.573 9.22 10.28 L 5.25 6.311 L 1.28 10.28 C 0.987 10.573 0.513 10.573 0.22 10.28 C -0.073 9.987 -0.073 9.513 0.22 9.22 L 4.189 5.25 L 0.22 1.28 C -0.073 0.987 -0.073 0.513 0.22 0.22 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: "var(--surface-page)",
      borderTop: "1px solid rgba(226,232,240,0.5)",
      borderRight: "1px solid rgba(226,232,240,0.5)",
      borderBottom: "0.600px solid rgba(226,232,240,0.5)",
      borderLeft: "1px solid rgba(226,232,240,0.5)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "8px 16px 8px 24px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 324,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 132,
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: 85,
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: "20px",
      color: "var(--text-headings-2)",
      flexShrink: 0
    }
  }, "February")), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 1,
    viewBox: "0 -0.500 16 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,89,20)",
      transformOrigin: "0 0",
      width: 16,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16 0 L 16 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 16 0.5 L 16 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-success)",
      flexShrink: 0
    }
  }, "85%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 67,
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--muted-2)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 12,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, "21/25 days"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 10.500,
    height: 10.500,
    viewBox: "0 0 10.500 10.500",
    fill: "none",
    style: {
      position: "absolute",
      left: 3.75,
      top: 3.75,
      width: 10.5,
      height: 10.5,
      color: "var(--icon-muted)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.22 0.22 C 0.513 -0.073 0.987 -0.073 1.28 0.22 L 5.25 4.189 L 9.22 0.22 C 9.513 -0.073 9.987 -0.073 10.28 0.22 C 10.573 0.513 10.573 0.987 10.28 1.28 L 6.311 5.25 L 10.28 9.22 C 10.573 9.513 10.573 9.987 10.28 10.28 C 9.987 10.573 9.513 10.573 9.22 10.28 L 5.25 6.311 L 1.28 10.28 C 0.987 10.573 0.513 10.573 0.22 10.28 C -0.073 9.987 -0.073 9.513 0.22 9.22 L 4.189 5.25 L 0.22 1.28 C -0.073 0.987 -0.073 0.513 0.22 0.22 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: "var(--surface-page)",
      borderTop: "1px solid rgba(226,232,240,0.5)",
      borderRight: "1px solid rgba(226,232,240,0.5)",
      borderBottom: "0.600px solid rgba(226,232,240,0.5)",
      borderLeft: "1px solid rgba(226,232,240,0.5)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "8px 16px 8px 24px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 324,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 132,
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: 85,
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: "20px",
      color: "var(--text-headings-2)",
      flexShrink: 0
    }
  }, "March")), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 1,
    viewBox: "0 -0.500 16 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,89,20)",
      transformOrigin: "0 0",
      width: 16,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16 0 L 16 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 16 0.5 L 16 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-success)",
      flexShrink: 0
    }
  }, "85%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 67,
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--muted-2)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 12,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, "21/25 days"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 10.500,
    height: 10.500,
    viewBox: "0 0 10.500 10.500",
    fill: "none",
    style: {
      position: "absolute",
      left: 3.75,
      top: 3.75,
      width: 10.5,
      height: 10.5,
      color: "var(--icon-muted)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.22 0.22 C 0.513 -0.073 0.987 -0.073 1.28 0.22 L 5.25 4.189 L 9.22 0.22 C 9.513 -0.073 9.987 -0.073 10.28 0.22 C 10.573 0.513 10.573 0.987 10.28 1.28 L 6.311 5.25 L 10.28 9.22 C 10.573 9.513 10.573 9.987 10.28 10.28 C 9.987 10.573 9.513 10.573 9.22 10.28 L 5.25 6.311 L 1.28 10.28 C 0.987 10.573 0.513 10.573 0.22 10.28 C -0.073 9.987 -0.073 9.513 0.22 9.22 L 4.189 5.25 L 0.22 1.28 C -0.073 0.987 -0.073 0.513 0.22 0.22 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: "var(--surface-page)",
      borderTop: "1px solid rgba(226,232,240,0.5)",
      borderRight: "1px solid rgba(226,232,240,0.5)",
      borderBottom: "0.600px solid rgba(226,232,240,0.5)",
      borderLeft: "1px solid rgba(226,232,240,0.5)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "8px 16px 8px 24px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 324,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 132,
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: 85,
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: "20px",
      color: "var(--text-headings-2)",
      flexShrink: 0
    }
  }, "April")), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 1,
    viewBox: "0 -0.500 16 1",
    fill: "none",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: "matrix(0,-1,1,0,89,20)",
      transformOrigin: "0 0",
      width: 16,
      height: 1,
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16 0 L 16 -0.5 L 0 -0.5 L 0 0 L 0 0.5 L 16 0.5 L 16 0 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "24px",
      color: "var(--text-success)",
      flexShrink: 0
    }
  }, "85%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 67,
      height: 20,
      borderRadius: 4,
      backgroundColor: "var(--muted-2)",
      display: "flex",
      flexDirection: "row",
      gap: 4,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 12,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-body)",
      flexShrink: 0
    }
  }, "21/25 days"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 18,
      height: 18,
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 10.500,
    height: 10.500,
    viewBox: "0 0 10.500 10.500",
    fill: "none",
    style: {
      position: "absolute",
      left: 3.75,
      top: 3.75,
      width: 10.5,
      height: 10.5,
      color: "var(--icon-muted)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0.22 0.22 C 0.513 -0.073 0.987 -0.073 1.28 0.22 L 5.25 4.189 L 9.22 0.22 C 9.513 -0.073 9.987 -0.073 10.28 0.22 C 10.573 0.513 10.573 0.987 10.28 1.28 L 6.311 5.25 L 10.28 9.22 C 10.573 9.513 10.573 9.987 10.28 10.28 C 9.987 10.573 9.513 10.573 9.22 10.28 L 5.25 6.311 L 1.28 10.28 C 0.987 10.573 0.513 10.573 0.22 10.28 C -0.073 9.987 -0.073 9.513 0.22 9.22 L 4.189 5.25 L 0.22 1.28 C -0.073 0.987 -0.073 0.513 0.22 0.22 Z",
    fill: "currentColor",
    fillRule: "evenodd"
  })))))))));
  const __impls = {
    // figma: Property 1=Default
    "property1=default": __body0,
    // figma: Property 1=Variant2
    "property1=variant2": __body1
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
Object.assign(__ds_scope, { ListAccordion, __ds_default_components_accordions_ListAccordion_9p907w: ListAccordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/accordions/ListAccordion.jsx", error: String((e && e.message) || e) }); }

// components/display/WorkoutTime.jsx
try { (() => {
// figma node: 173:3488 Workout time
function WorkoutTime(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 166,
      overflow: "hidden",
      backgroundColor: "var(--surface-page)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: "8px 8px 8px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "var(--border-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 92,
      display: "flex",
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: "var(--text-headings-2)",
      flexShrink: 0
    }
  }, props.text1 ?? "Maths "), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 24,
      height: 1,
      border: "1px dashed currentColor",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      fontSize: 10,
      opacity: 0.45
    }
  }, "Separator"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "\"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      whiteSpace: "nowrap",
      lineHeight: "28px",
      color: "var(--text-success)",
      flexShrink: 0
    }
  }, props.text2 ?? "95%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 24,
      height: 24,
      flexShrink: 0,
      color: "var(--icon-success)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.HxTrendUp01Filled, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 7,
      alignItems: "center",
      flexWrap: "nowrap",
      flexShrink: 0,
      alignSelf: "stretch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      whiteSpace: "pre-wrap",
      lineHeight: "12px",
      color: "rgb(64,64,64)",
      flexShrink: 0
    }
  }, "Grade : ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontSize: 10,
      textTransform: "none",
      fontVariant: "normal"
    }
  }, "A")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 3,
      height: 3,
      borderRadius: "50%",
      backgroundColor: "rgb(100,116,139)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 300,
      fontSize: 10,
      whiteSpace: "nowrap",
      lineHeight: "12px",
      color: "rgb(64,64,64)",
      flexShrink: 0
    }
  }, props.text3 ?? "Score : 38/40"))));
}
Object.assign(__ds_scope, { WorkoutTime, __ds_default_components_display_WorkoutTime_wp6ycp: WorkoutTime });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/WorkoutTime.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/IconCheck.jsx
try { (() => {
// figma node: 1:671 icon/check
function IconCheck(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--foreground)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 18,
    height: 13,
    viewBox: "0 0 18 13",
    fill: "none",
    style: {
      position: "absolute",
      left: 3,
      top: 5,
      width: 18,
      height: 13
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 17.707 1.707 C 18.098 1.317 18.098 0.683 17.707 0.293 M 6.707 12.707 L 17.707 1.707 M 5.293 12.707 C 5.683 13.098 6.317 13.098 6.707 12.707 M 0.293 7.707 L 5.293 12.707 M 0.293 6.293 C -0.098 6.683 -0.098 7.317 0.293 7.707 M 1.707 6.293 C 1.317 5.902 0.683 5.902 0.293 6.293 M 6 10.586 L 1.707 6.293 M 16.293 0.293 L 6 10.586 M 17.707 0.293 C 17.317 -0.098 16.683 -0.098 16.293 0.293 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { IconCheck, __ds_default_components_glyphs_IconCheck_1ybbwpz: IconCheck });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/IconCheck.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/Mail01.jsx
try { (() => {
// figma node: 1:455 mail-01
function Mail01(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--icon-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 22.000,
    height: 18,
    viewBox: "0 0 22.000 18",
    fill: "none",
    style: {
      position: "absolute",
      left: 1,
      top: 3,
      width: 22,
      height: 18
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 16.241 0 L 5.759 0 M 18.252 0.044 C 17.711 0 17.046 0 16.241 0 M 19.816 0.436 C 19.331 0.189 18.814 0.09 18.252 0.044 M 21.564 2.184 C 21.181 1.431 20.569 0.819 19.816 0.436 M 21.951 3.689 C 21.903 3.15 21.803 2.652 21.564 2.184 M 21.982 4.19 C 22.014 4.025 22.004 3.853 21.951 3.689 M 22 5.759 C 22 5.16 22 4.64 21.982 4.19 M 22 12.241 L 22 5.759 M 21.956 14.252 C 22 13.711 22 13.046 22 12.241 M 21.564 15.816 C 21.811 15.331 21.91 14.814 21.956 14.252 M 19.816 17.564 C 20.569 17.181 21.181 16.569 21.564 15.816 M 18.252 17.956 C 18.814 17.91 19.331 17.811 19.816 17.564 M 16.241 18 C 17.046 18 17.711 18 18.252 17.956 M 5.759 18 L 16.241 18 M 3.748 17.956 C 4.289 18 4.954 18 5.759 18 M 2.184 17.564 C 2.669 17.811 3.186 17.91 3.748 17.956 M 0.436 15.816 C 0.82 16.569 1.431 17.181 2.184 17.564 M 0.044 14.252 C 0.09 14.814 0.189 15.331 0.436 15.816 M 0 12.241 C 0 13.046 0 13.711 0.044 14.252 M 0 5.759 L 0 12.241 M 0.018 4.19 C 0 4.64 0 5.16 0 5.759 M 0.049 3.689 C -0.004 3.853 -0.014 4.025 0.018 4.19 M 0.436 2.184 C 0.197 2.652 0.097 3.15 0.049 3.689 M 2.184 0.436 C 1.431 0.819 0.82 1.431 0.436 2.184 M 3.748 0.044 C 3.186 0.09 2.669 0.189 2.184 0.436 M 5.759 0 C 4.954 0 4.289 0 3.748 0.044 Z M 2 12.2 L 2 5.921 M 2.038 14.089 C 2.001 13.639 2 13.057 2 12.2 M 2.218 14.908 C 2.138 14.752 2.073 14.527 2.038 14.089 M 3.092 15.782 C 2.716 15.59 2.41 15.284 2.218 14.908 M 3.911 15.962 C 3.473 15.927 3.249 15.862 3.092 15.782 M 5.8 16 C 4.944 16 4.361 15.999 3.911 15.962 M 16.2 16 L 5.8 16 M 18.089 15.962 C 17.639 15.999 17.057 16 16.2 16 M 18.908 15.782 C 18.752 15.862 18.527 15.927 18.089 15.962 M 19.782 14.908 C 19.59 15.284 19.284 15.59 18.908 15.782 M 19.963 14.089 C 19.927 14.527 19.862 14.752 19.782 14.908 M 20 12.2 C 20 13.057 19.999 13.639 19.963 14.089 M 20 5.921 L 20 12.2 M 13.409 10.535 L 20 5.921 M 13.293 10.616 C 13.331 10.589 13.37 10.562 13.409 10.535 M 11.726 11.47 C 12.27 11.334 12.749 10.998 13.293 10.616 M 10.274 11.47 C 10.751 11.588 11.249 11.588 11.726 11.47 M 8.707 10.616 C 9.252 10.998 9.73 11.334 10.274 11.47 M 8.592 10.535 C 8.63 10.562 8.669 10.589 8.707 10.616 M 2 5.921 L 8.592 10.535 Z M 19.917 3.537 L 12.262 8.896 C 11.533 9.406 11.378 9.495 11.242 9.529 C 11.083 9.569 10.917 9.569 10.758 9.529 C 10.622 9.495 10.467 9.406 9.738 8.896 L 2.083 3.537 C 2.119 3.33 2.165 3.196 2.218 3.092 C 2.41 2.716 2.716 2.41 3.092 2.218 C 3.249 2.138 3.473 2.073 3.911 2.038 C 4.361 2.001 4.944 2 5.8 2 L 16.2 2 C 17.057 2 17.639 2.001 18.089 2.038 C 18.527 2.073 18.752 2.138 18.908 2.218 C 19.284 2.41 19.59 2.716 19.782 3.092 C 19.835 3.196 19.882 3.33 19.917 3.537 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { Mail01, __ds_default_components_glyphs_Mail01_xlv5lw: Mail01 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/Mail01.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
// figma node: 1:488 .Field (36 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "type=" + __venc(p.type) + '|' + "filled=" + __venc(p.filled) + '|' + "size=" + __venc(p.size);
function Field(_p = {}) {
  const props = {
    ..._p,
    text: _p.text ?? "Placeholder",
    type: _p.type ?? "default",
    leadIcon2: _p.leadIcon2 ?? true,
    actionIcon: _p.actionIcon ?? true,
    filled: _p.filled ?? false,
    size: _p.size ?? "default"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 36,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1,
      alignSelf: "stretch"
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 32,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body2 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body3 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 36,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1,
      alignSelf: "stretch"
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)));
  const __body4 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 32,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body5 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body6 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 36,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-hover)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1,
      alignSelf: "stretch"
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)));
  const __body7 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 32,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-hover)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body8 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-hover)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body9 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 36,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-hover)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1,
      alignSelf: "stretch"
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)));
  const __body10 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 32,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-hover)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body11 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-hover)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body12 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 36,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1,
      alignSelf: "stretch"
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -1,
      top: -1,
      width: 242,
      height: 38,
      borderRadius: 7,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body13 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 32,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -1,
      top: -1,
      width: 242,
      height: 34,
      borderRadius: 7,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body14 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -1,
      top: -1,
      width: 242,
      height: 42,
      borderRadius: 7,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body15 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 36,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1,
      alignSelf: "stretch"
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -1,
      top: -1,
      width: 242,
      height: 38,
      borderRadius: 7,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body16 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 32,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -1,
      top: -1,
      width: 242,
      height: 34,
      borderRadius: 7,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body17 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -1,
      top: -1,
      width: 242,
      height: 42,
      borderRadius: 7,
      boxShadow: "0 0 0 2px var(--border-focus)"
    }
  }));
  const __body18 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 36,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-error)",
      borderRight: "1px solid var(--border-error)",
      borderBottom: "1px solid var(--border-error)",
      borderLeft: "1px solid var(--border-error)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-error)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1,
      alignSelf: "stretch"
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)));
  const __body19 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 32,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-error)",
      borderRight: "1px solid var(--border-error)",
      borderBottom: "1px solid var(--border-error)",
      borderLeft: "1px solid var(--border-error)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-error)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body20 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-error)",
      borderRight: "1px solid var(--border-error)",
      borderBottom: "1px solid var(--border-error)",
      borderLeft: "1px solid var(--border-error)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-error)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body21 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 36,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-error)",
      borderRight: "1px solid var(--border-error)",
      borderBottom: "1px solid var(--border-error)",
      borderLeft: "1px solid var(--border-error)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-error)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1,
      alignSelf: "stretch"
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)));
  const __body22 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 32,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-error)",
      borderRight: "1px solid var(--border-error)",
      borderBottom: "1px solid var(--border-error)",
      borderLeft: "1px solid var(--border-error)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-error)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body23 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-error)",
      borderRight: "1px solid var(--border-error)",
      borderBottom: "1px solid var(--border-error)",
      borderLeft: "1px solid var(--border-error)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-error)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body24 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 36,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-success)",
      borderRight: "1px solid var(--border-success)",
      borderBottom: "1px solid var(--border-success)",
      borderLeft: "1px solid var(--border-success)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-success)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1,
      alignSelf: "stretch"
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)));
  const __body25 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 32,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-success)",
      borderRight: "1px solid var(--border-success)",
      borderBottom: "1px solid var(--border-success)",
      borderLeft: "1px solid var(--border-success)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-success)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body26 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-success)",
      borderRight: "1px solid var(--border-success)",
      borderBottom: "1px solid var(--border-success)",
      borderLeft: "1px solid var(--border-success)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-success)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-muted)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body27 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 36,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-success)",
      borderRight: "1px solid var(--border-success)",
      borderBottom: "1px solid var(--border-success)",
      borderLeft: "1px solid var(--border-success)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-success)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1,
      alignSelf: "stretch"
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)));
  const __body28 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 32,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-success)",
      borderRight: "1px solid var(--border-success)",
      borderBottom: "1px solid var(--border-success)",
      borderLeft: "1px solid var(--border-success)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-success)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body29 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--input-surface-default)",
      borderTop: "1px solid var(--border-success)",
      borderRight: "1px solid var(--border-success)",
      borderBottom: "1px solid var(--border-success)",
      borderLeft: "1px solid var(--border-success)",
      boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-success)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-body)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(15,23,42)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body30 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 36,
      borderRadius: 6,
      backgroundColor: "var(--surface-disabled)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(51,65,85)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-on-disabled)",
      flexGrow: 1,
      alignSelf: "stretch"
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-on-disabled)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, null)));
  const __body31 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 32,
      borderRadius: 6,
      backgroundColor: "var(--surface-disabled)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-on-disabled)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-disabled)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __body32 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 240,
      height: 40,
      borderRadius: 6,
      backgroundColor: "var(--surface-disabled)",
      borderTop: "1px solid var(--border-light)",
      borderRight: "1px solid var(--border-light)",
      borderBottom: "1px solid var(--border-light)",
      borderLeft: "1px solid var(--border-light)",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: "8px 12px 8px 12px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      ...props.style
    }
  }, props.leadIcon2 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "rgb(51,65,85)"
    }
  }, props.leadIcon ?? /*#__PURE__*/React.createElement(__ds_scope.Mail01, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--text-on-disabled)",
      flexGrow: 1
    }
  }, props.text), props.actionIcon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0,
      color: "var(--icon-on-disabled)"
    }
  }, props.actionIcon2 ?? /*#__PURE__*/React.createElement(__ds_scope.ChevronDown, {
    style: {
      transform: "scale(0.833, 0.833)",
      transformOrigin: "0 0"
    }
  })));
  const __impls = {
    // figma: Type=Default, Filled=False, Size=Default
    "type=default|filled=false|size=default": __body0,
    // figma: Type=Default, Filled=False, Size=Small
    "type=default|filled=false|size=sm": __body1,
    // figma: Type=Default, Filled=False, Size=Large
    "type=default|filled=false|size=lg": __body2,
    // figma: Type=Default, Filled=True, Size=Default
    "type=default|filled=true|size=default": __body3,
    // figma: Type=Default, Filled=True, Size=Small
    "type=default|filled=true|size=sm": __body4,
    // figma: Type=Default, Filled=True, Size=Large
    "type=default|filled=true|size=lg": __body5,
    // figma: Type=Hover, Filled=False, Size=Default
    "type=hover|filled=false|size=default": __body6,
    // figma: Type=Hover, Filled=False, Size=Small
    "type=hover|filled=false|size=sm": __body7,
    // figma: Type=Hover, Filled=False, Size=Large
    "type=hover|filled=false|size=lg": __body8,
    // figma: Type=Hover, Filled=True, Size=Default
    "type=hover|filled=true|size=default": __body9,
    // figma: Type=Hover, Filled=True, Size=Small
    "type=hover|filled=true|size=sm": __body10,
    // figma: Type=Hover, Filled=True, Size=Large
    "type=hover|filled=true|size=lg": __body11,
    // figma: Type=Focus, Filled=False, Size=Default
    "type=focus|filled=false|size=default": __body12,
    // figma: Type=Focus, Filled=False, Size=Small
    "type=focus|filled=false|size=sm": __body13,
    // figma: Type=Focus, Filled=False, Size=Large
    "type=focus|filled=false|size=lg": __body14,
    // figma: Type=Focus, Filled=True, Size=Default
    "type=focus|filled=true|size=default": __body15,
    // figma: Type=Focus, Filled=True, Size=Small
    "type=focus|filled=true|size=sm": __body16,
    // figma: Type=Focus, Filled=True, Size=Large
    "type=focus|filled=true|size=lg": __body17,
    // figma: Type=Error, Filled=False, Size=Default
    "type=error|filled=false|size=default": __body18,
    // figma: Type=Error, Filled=False, Size=Small
    "type=error|filled=false|size=sm": __body19,
    // figma: Type=Error, Filled=False, Size=Large
    "type=error|filled=false|size=lg": __body20,
    // figma: Type=Error, Filled=True, Size=Default
    "type=error|filled=true|size=default": __body21,
    // figma: Type=Error, Filled=True, Size=Small
    "type=error|filled=true|size=sm": __body22,
    // figma: Type=Error, Filled=True, Size=Large
    "type=error|filled=true|size=lg": __body23,
    // figma: Type=Success, Filled=False, Size=Default
    "type=success|filled=false|size=default": __body24,
    // figma: Type=Success, Filled=False, Size=Small
    "type=success|filled=false|size=sm": __body25,
    // figma: Type=Success, Filled=False, Size=Large
    "type=success|filled=false|size=lg": __body26,
    // figma: Type=Success, Filled=True, Size=Default
    "type=success|filled=true|size=default": __body27,
    // figma: Type=Success, Filled=True, Size=Small
    "type=success|filled=true|size=sm": __body28,
    // figma: Type=Success, Filled=True, Size=Large
    "type=success|filled=true|size=lg": __body29,
    // figma: Type=Disabled, Filled=False, Size=Default
    "type=disabled|filled=false|size=default": __body30,
    // figma: Type=Disabled, Filled=False, Size=Small
    "type=disabled|filled=false|size=sm": __body31,
    // figma: Type=Disabled, Filled=False, Size=Large
    "type=disabled|filled=false|size=lg": __body32,
    // figma: Type=Disabled, Filled=True, Size=Default
    "type=disabled|filled=true|size=default": __body30,
    // figma: Type=Disabled, Filled=True, Size=Small
    "type=disabled|filled=true|size=sm": __body31,
    // figma: Type=Disabled, Filled=True, Size=Large
    "type=disabled|filled=true|size=lg": __body32
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
Object.assign(__ds_scope, { Field, __ds_default_components_forms_Field_jq849g: Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/glyphs/Minus.jsx
try { (() => {
// figma node: 1:673 minus
function Minus(_p = {}) {
  const props = _p;
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--icon-default)",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 2,
    viewBox: "0 0 16 2",
    fill: "none",
    style: {
      position: "absolute",
      left: 4,
      top: 11,
      width: 16,
      height: 2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 1 0 C 0.448 0 0 0.448 0 1 M 15 0 L 1 0 M 16 1 C 16 0.448 15.552 0 15 0 M 15 2 C 15.552 2 16 1.552 16 1 M 1 2 L 15 2 M 0 1 C 0 1.552 0.448 2 1 2 Z",
    fill: "currentColor",
    fillRule: "nonzero"
  })));
}
Object.assign(__ds_scope, { Minus, __ds_default_components_glyphs_Minus_op7hos: Minus });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glyphs/Minus.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
// figma node: 1:689 .Checkbox (15 variants)
const __venc = v => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = p => "state=" + __venc(p.state) + '|' + "type=" + __venc(p.type);
function Checkbox(_p = {}) {
  const props = {
    ..._p,
    state: _p.state ?? "default",
    type: _p.type ?? "default"
  };
  const __body0 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      borderRadius: 4,
      backgroundColor: "var(--surface-action)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(23,23,23)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.IconCheck, null)));
  const __body1 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      borderRadius: 4,
      backgroundColor: "var(--surface-action)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-on-action)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.Minus, null)));
  const __body2 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      borderRadius: 4,
      backgroundColor: "var(--surface-action-hover)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(23,23,23)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.IconCheck, null)));
  const __body3 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      borderRadius: 4,
      backgroundColor: "var(--surface-action-hover)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-on-action)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.Minus, null)));
  const __body4 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      borderRadius: 4,
      backgroundColor: "var(--surface-disabled)",
      borderTop: "1px solid var(--border-disabled)",
      borderRight: "1px solid var(--border-disabled)",
      borderBottom: "1px solid var(--border-disabled)",
      borderLeft: "1px solid var(--border-disabled)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-on-disabled)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.IconCheck, null)));
  const __body5 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      borderRadius: 4,
      backgroundColor: "var(--surface-disabled)",
      borderTop: "1px solid var(--border-disabled)",
      borderRight: "1px solid var(--border-disabled)",
      borderBottom: "1px solid var(--border-disabled)",
      borderLeft: "1px solid var(--border-disabled)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-on-disabled)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.Minus, null)));
  const __body6 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      borderRadius: 4,
      backgroundColor: "var(--surface-error)",
      borderTop: "1px solid var(--border-error)",
      borderRight: "1px solid var(--border-error)",
      borderBottom: "1px solid var(--border-error)",
      borderLeft: "1px solid var(--border-error)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-error)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.IconCheck, null)));
  const __body7 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      borderRadius: 4,
      backgroundColor: "var(--surface-error)",
      borderTop: "1px solid var(--border-error)",
      borderRight: "1px solid var(--border-error)",
      borderBottom: "1px solid var(--border-error)",
      borderLeft: "1px solid var(--border-error)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-error)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.Minus, null)));
  const __body8 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      borderRadius: 4,
      backgroundColor: "var(--surface-action-hover)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "rgb(23,23,23)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.IconCheck, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 20,
      height: 20,
      borderRadius: 6,
      boxShadow: "inset 0 0 0 1px var(--border-focus)"
    }
  }));
  const __body9 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: "fit-content",
      borderRadius: 4,
      backgroundColor: "var(--surface-action-hover)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 16,
      flexShrink: 0,
      alignSelf: "stretch",
      height: "auto",
      color: "var(--icon-on-action)"
    }
  }, props.icon1 ?? /*#__PURE__*/React.createElement(__ds_scope.Minus, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 20,
      height: 20,
      borderRadius: 6,
      boxShadow: "inset 0 0 0 1px var(--border-focus)"
    }
  }));
  const __body10 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      borderTop: "1px solid var(--border-secondary)",
      borderRight: "1px solid var(--border-secondary)",
      borderBottom: "1px solid var(--border-secondary)",
      borderLeft: "1px solid var(--border-secondary)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  });
  const __body11 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      backgroundColor: "var(--surface-hover)",
      borderTop: "1px solid var(--border-action)",
      borderRight: "1px solid var(--border-action)",
      borderBottom: "1px solid var(--border-action)",
      borderLeft: "1px solid var(--border-action)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  });
  const __body12 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      borderTop: "1px solid var(--border-default)",
      borderRight: "1px solid var(--border-default)",
      borderBottom: "1px solid var(--border-default)",
      borderLeft: "1px solid var(--border-default)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: 20,
      height: 20,
      borderRadius: 6,
      boxShadow: "inset 0 0 0 1px var(--border-focus)"
    }
  }));
  const __body13 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      backgroundColor: "var(--surface-disabled)",
      borderTop: "1px solid var(--border-disabled)",
      borderRight: "1px solid var(--border-disabled)",
      borderBottom: "1px solid var(--border-disabled)",
      borderLeft: "1px solid var(--border-disabled)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  });
  const __body14 = () => /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      backgroundColor: "var(--surface-error)",
      borderTop: "1px solid var(--border-error)",
      borderRight: "1px solid var(--border-error)",
      borderBottom: "1px solid var(--border-error)",
      borderLeft: "1px solid var(--border-error)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style
    }
  });
  const __impls = {
    // figma: State=Default, Type=Selected
    "state=default|type=selected": __body0,
    // figma: State=Default, Type=Intermediate
    "state=default|type=intermediate": __body1,
    // figma: State=Hover, Type=Selected
    "state=hover|type=selected": __body2,
    // figma: State=Hover, Type=Intermediate
    "state=hover|type=intermediate": __body3,
    // figma: State=Disabled, Type=Selected
    "state=disabled|type=selected": __body4,
    // figma: State=Disabled, Type=Intermediate
    "state=disabled|type=intermediate": __body5,
    // figma: State=Error, Type=Selected
    "state=error|type=selected": __body6,
    // figma: State=Error, Type=Intermediate
    "state=error|type=intermediate": __body7,
    // figma: State=Focus, Type=Selected
    "state=focus|type=selected": __body8,
    // figma: State=Focus, Type=Intermediate
    "state=focus|type=intermediate": __body9,
    // figma: State=Default, Type=Default
    "state=default|type=default": __body10,
    // figma: State=Hover, Type=Default
    "state=hover|type=default": __body11,
    // figma: State=Focus, Type=Default
    "state=focus|type=default": __body12,
    // figma: State=Disabled, Type=Default
    "state=disabled|type=default": __body13,
    // figma: State=Error, Type=Default
    "state=error|type=default": __body14
  };
  return (__impls[__vkey(props)] ?? __body10)();
}
Object.assign(__ds_scope, { Checkbox, __ds_default_components_forms_Checkbox_i1jt6f: Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/icons/icon-data.js
try { (() => {
// Generated by fig_materialize (moduleFormat: 'icon-data') — 25 icon(s)
// as { viewBox, body } SVG-markup entries. Render via the sibling Icon.jsx
// (<Icon name="ArrowLeft" />), or consume the path data directly.
let __ds_default_components_icons_icon_data_12stud1;
try {
  __ds_default_components_icons_icon_data_12stud1 = {
    "ArrowLeft": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 8.707 1.707 C 9.098 1.317 9.098 0.683 8.707 0.293 M 3.414 7 L 8.707 1.707 M 15 7 L 3.414 7 M 16 8 C 16 7.448 15.552 7 15 7 M 15 9 C 15.552 9 16 8.552 16 8 M 3.414 9 L 15 9 M 8.707 14.293 L 3.414 9 M 8.707 15.707 C 9.098 15.317 9.098 14.683 8.707 14.293 M 7.293 15.707 C 7.683 16.098 8.317 16.098 8.707 15.707 M 0.293 8.707 L 7.293 15.707 M 0.293 7.293 C -0.098 7.683 -0.098 8.317 0.293 8.707 M 7.293 0.293 L 0.293 7.293 M 8.707 0.293 C 8.317 -0.098 7.683 -0.098 7.293 0.293 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 4 4)\"/>"
    },
    "ArrowLeftFilled": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 8.707 0.293 C 9.098 0.683 9.098 1.317 8.707 1.707 M 7.293 0.293 C 7.683 -0.098 8.317 -0.098 8.707 0.293 M 0.293 7.293 L 7.293 0.293 M 0.293 8.707 C -0.098 8.317 -0.098 7.683 0.293 7.293 M 7.293 15.707 L 0.293 8.707 M 8.707 15.707 C 8.317 16.098 7.683 16.098 7.293 15.707 M 8.707 14.293 C 9.098 14.683 9.098 15.317 8.707 15.707 M 3.414 9 L 8.707 14.293 M 15 9 L 3.414 9 M 16 8 C 16 8.552 15.552 9 15 9 M 15 7 C 15.552 7 16 7.448 16 8 M 3.414 7 L 15 7 M 8.707 1.707 L 3.414 7 Z\" fill=\"currentColor\" fill-rule=\"evenodd\" transform=\"matrix(1 0 0 1 4 4)\"/>"
    },
    "ArrowRight": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 8.707 0.293 C 8.317 -0.098 7.683 -0.098 7.293 0.293 M 15.707 7.293 L 8.707 0.293 M 15.707 8.707 C 16.098 8.317 16.098 7.683 15.707 7.293 M 8.707 15.707 L 15.707 8.707 M 7.293 15.707 C 7.683 16.098 8.317 16.098 8.707 15.707 M 7.293 14.293 C 6.902 14.683 6.902 15.317 7.293 15.707 M 12.586 9 L 7.293 14.293 M 1 9 L 12.586 9 M 0 8 C 0 8.552 0.448 9 1 9 M 1 7 C 0.448 7 0 7.448 0 8 M 12.586 7 L 1 7 M 7.293 1.707 L 12.586 7 M 7.293 0.293 C 6.902 0.683 6.902 1.317 7.293 1.707 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 4 4)\"/>"
    },
    "Bank": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 10.175 0.008 C 10.058 -0.003 9.942 -0.003 9.825 0.008 M 10.537 0.071 C 10.436 0.048 10.308 0.019 10.175 0.008 M 10.564 0.077 C 10.555 0.075 10.546 0.073 10.537 0.071 M 17.991 1.727 L 10.564 0.077 M 18.559 1.866 C 18.39 1.816 18.191 1.771 17.991 1.727 M 19.169 2.155 C 18.961 2.005 18.747 1.923 18.559 1.866 M 19.838 2.989 C 19.695 2.655 19.463 2.367 19.169 2.155 M 19.987 3.647 C 19.973 3.451 19.939 3.225 19.838 2.989 M 20 4.232 C 20 4.026 20 3.822 19.987 3.647 M 20 5.408 L 20 4.232 M 19.983 6.114 C 20 5.906 20 5.66 20 5.408 M 19.782 6.884 C 19.92 6.612 19.964 6.342 19.983 6.114 M 18.908 7.758 C 19.284 7.566 19.59 7.26 19.782 6.884 M 18.138 7.959 C 18.367 7.94 18.637 7.896 18.908 7.758 M 18 7.967 C 18.048 7.965 18.094 7.962 18.138 7.959 M 18 13.984 L 18 7.967 M 18.138 13.993 C 18.094 13.989 18.048 13.986 18 13.984 M 18.908 14.194 C 18.637 14.055 18.367 14.011 18.138 13.993 M 19.782 15.068 C 19.59 14.691 19.284 14.385 18.908 14.194 M 19.983 15.837 C 19.964 15.609 19.92 15.339 19.782 15.068 M 20 16.544 C 20 16.291 20 16.046 19.983 15.837 M 20 17.408 L 20 16.544 M 19.983 18.114 C 20 17.906 20 17.66 20 17.408 M 19.782 18.884 C 19.92 18.612 19.964 18.342 19.983 18.114 M 18.908 19.758 C 19.284 19.566 19.59 19.26 19.782 18.884 M 18.138 19.959 C 18.367 19.94 18.637 19.896 18.908 19.758 M 17.432 19.976 C 17.684 19.976 17.93 19.976 18.138 19.959 M 2.568 19.976 L 17.432 19.976 M 1.862 19.959 C 2.07 19.976 2.316 19.976 2.568 19.976 M 1.092 19.758 C 1.363 19.896 1.633 19.94 1.862 19.959 M 0.218 18.884 C 0.41 19.26 0.716 19.566 1.092 19.758 M 0.017 18.114 C 0.036 18.342 0.08 18.612 0.218 18.884 M 0 17.408 C 0 17.66 0 17.906 0.017 18.114 M 0 16.544 L 0 17.408 M 0.017 15.837 C 0 16.046 0 16.291 0 16.544 M 0.218 15.068 C 0.08 15.339 0.036 15.609 0.017 15.837 M 1.092 14.194 C 0.716 14.385 0.41 14.691 0.218 15.068 M 1.862 13.993 C 1.633 14.011 1.363 14.055 1.092 14.194 M 2 13.984 C 1.952 13.986 1.906 13.989 1.862 13.993 M 2 7.967 L 2 13.984 M 1.862 7.959 C 1.906 7.962 1.952 7.965 2 7.967 M 1.092 7.758 C 1.363 7.896 1.633 7.94 1.862 7.959 M 0.218 6.884 C 0.41 7.26 0.716 7.566 1.092 7.758 M 0.017 6.114 C 0.036 6.342 0.08 6.612 0.218 6.884 M 0 5.408 C 0 5.66 0 5.906 0.017 6.114 M 0 5.376 C 0 5.386 0 5.397 0 5.408 M 0 4.259 L 0 5.376 M 0 4.232 C 0 4.241 0 4.25 0 4.259 M 0.013 3.647 C 0 3.822 0 4.026 0 4.232 M 0.162 2.989 C 0.061 3.225 0.027 3.451 0.013 3.647 M 0.831 2.155 C 0.537 2.367 0.305 2.655 0.162 2.989 M 1.441 1.866 C 1.253 1.923 1.039 2.005 0.831 2.155 M 2.009 1.727 C 1.809 1.771 1.61 1.816 1.441 1.866 M 2.036 1.721 C 2.027 1.723 2.018 1.725 2.009 1.727 M 9.436 0.077 L 2.036 1.721 M 9.463 0.071 C 9.454 0.073 9.445 0.075 9.436 0.077 M 9.825 0.008 C 9.692 0.019 9.564 0.048 9.463 0.071 Z M 4 13.976 L 4 7.976 M 6.5 13.976 L 4 13.976 M 6.5 7.976 L 6.5 13.976 M 4 7.976 L 6.5 7.976 Z M 2.6 5.976 C 2.303 5.976 2.141 5.975 2.025 5.965 C 2.02 5.965 2.016 5.965 2.011 5.964 C 2.011 5.96 2.011 5.956 2.01 5.951 C 2.001 5.834 2 5.672 2 5.376 L 2 4.259 C 2 4.016 2.001 3.887 2.007 3.793 C 2.008 3.79 2.008 3.787 2.008 3.784 C 2.011 3.783 2.014 3.783 2.017 3.782 C 2.106 3.755 2.232 3.726 2.47 3.673 L 9.87 2.029 C 9.939 2.013 9.973 2.006 9.998 2.001 C 9.999 2.001 9.999 2.001 10 2.001 C 10.001 2.001 10.001 2.001 10.002 2.001 C 10.027 2.006 10.061 2.013 10.13 2.029 L 17.53 3.673 C 17.768 3.726 17.894 3.755 17.983 3.782 C 17.986 3.783 17.989 3.783 17.992 3.784 C 17.992 3.787 17.992 3.79 17.993 3.793 C 17.999 3.887 18 4.016 18 4.259 L 18 5.376 C 18 5.672 17.999 5.834 17.99 5.951 C 17.989 5.956 17.989 5.96 17.989 5.964 C 17.984 5.965 17.98 5.965 17.975 5.965 C 17.859 5.975 17.697 5.976 17.4 5.976 L 2.6 5.976 Z M 8.5 13.976 L 8.5 7.976 M 11.5 13.976 L 8.5 13.976 M 11.5 7.976 L 11.5 13.976 M 8.5 7.976 L 11.5 7.976 Z M 13.5 13.976 L 13.5 7.976 M 16 13.976 L 13.5 13.976 M 16 7.976 L 16 13.976 M 13.5 7.976 L 16 7.976 Z M 2.025 15.986 C 2.141 15.976 2.303 15.976 2.6 15.976 M 2.011 15.987 C 2.016 15.987 2.02 15.986 2.025 15.986 M 2.01 16 C 2.011 15.996 2.011 15.991 2.011 15.987 M 2 16.576 C 2 16.279 2.001 16.117 2.01 16 M 2 17.376 L 2 16.576 M 2.01 17.951 C 2.001 17.834 2 17.672 2 17.376 M 2.011 17.964 C 2.011 17.96 2.011 17.956 2.01 17.951 M 2.025 17.965 C 2.02 17.965 2.016 17.965 2.011 17.964 M 2.6 17.976 C 2.303 17.976 2.141 17.975 2.025 17.965 M 17.4 17.976 L 2.6 17.976 M 17.975 17.965 C 17.859 17.975 17.697 17.976 17.4 17.976 M 17.989 17.964 C 17.984 17.965 17.98 17.965 17.975 17.965 M 17.99 17.951 C 17.989 17.956 17.989 17.96 17.989 17.964 M 18 17.376 C 18 17.672 17.999 17.834 17.99 17.951 M 18 16.576 L 18 17.376 M 17.99 16 C 17.999 16.117 18 16.279 18 16.576 M 17.989 15.987 C 17.989 15.991 17.989 15.996 17.99 16 M 17.975 15.986 C 17.98 15.986 17.984 15.987 17.989 15.987 M 17.4 15.976 C 17.697 15.976 17.859 15.976 17.975 15.986 M 2.6 15.976 L 17.4 15.976 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 2 2.024)\"/>"
    },
    "BarChart07": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 2 1 C 2 0.448 1.552 0 1 0 M 2 15.8 L 2 1 M 2.024 17.032 C 2.001 16.749 2 16.377 2 15.8 M 2.109 17.454 C 2.084 17.405 2.046 17.304 2.024 17.032 M 2.546 17.891 C 2.358 17.795 2.205 17.642 2.109 17.454 M 2.968 17.976 C 2.696 17.954 2.595 17.916 2.546 17.891 M 4.2 18 C 3.623 18 3.251 17.999 2.968 17.976 M 19 18 L 4.2 18 M 20 19 C 20 18.448 19.552 18 19 18 M 19 20 C 19.552 20 20 19.552 20 19 M 4.161 20 L 19 20 M 2.805 19.969 C 3.18 20 3.634 20 4.161 20 M 1.638 19.673 C 2.016 19.866 2.41 19.937 2.805 19.969 M 0.327 18.362 C 0.615 18.926 1.074 19.385 1.638 19.673 M 0.031 17.195 C 0.063 17.59 0.134 17.984 0.327 18.362 M 0 15.839 C 0 16.366 0 16.82 0.031 17.195 M 0 1 L 0 15.839 M 1 0 C 0.448 0 0 0.448 0 1 Z M 10.5 3.5 C 10.5 2.948 10.052 2.5 9.5 2.5 M 10.5 15.5 L 10.5 3.5 M 9.5 16.5 C 10.052 16.5 10.5 16.052 10.5 15.5 M 8.5 15.5 C 8.5 16.052 8.948 16.5 9.5 16.5 M 8.5 3.5 L 8.5 15.5 M 9.5 2.5 C 8.948 2.5 8.5 2.948 8.5 3.5 Z M 19.5 3.5 C 19.5 2.948 19.052 2.5 18.5 2.5 M 19.5 15.5 L 19.5 3.5 M 18.5 16.5 C 19.052 16.5 19.5 16.052 19.5 15.5 M 17.5 15.5 C 17.5 16.052 17.948 16.5 18.5 16.5 M 17.5 3.5 L 17.5 15.5 M 18.5 2.5 C 17.948 2.5 17.5 2.948 17.5 3.5 Z M 6 8.5 C 6 7.948 5.552 7.5 5 7.5 M 6 15.5 L 6 8.5 M 5 16.5 C 5.552 16.5 6 16.052 6 15.5 M 4 15.5 C 4 16.052 4.448 16.5 5 16.5 M 4 8.5 L 4 15.5 M 5 7.5 C 4.448 7.5 4 7.948 4 8.5 Z M 15 8.5 C 15 7.948 14.552 7.5 14 7.5 M 15 15.5 L 15 8.5 M 14 16.5 C 14.552 16.5 15 16.052 15 15.5 M 13 15.5 C 13 16.052 13.448 16.5 14 16.5 M 13 8.5 L 13 15.5 M 14 7.5 C 13.448 7.5 13 7.948 13 8.5 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 2 2)\"/>"
    },
    "Briefcase02": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 11 0 C 10.953 0 10.908 0 10.862 0 M 11.138 0 C 11.092 0 11.047 0 11 0 M 13.035 0.136 C 12.524 -0.001 11.933 0 11.138 0 M 15.864 2.965 C 15.494 1.584 14.416 0.506 13.035 0.136 M 15.992 4 C 15.979 3.608 15.946 3.272 15.864 2.965 M 17.839 4 L 15.992 4 M 19.195 4.031 C 18.82 4 18.366 4 17.839 4 M 20.362 4.327 C 19.984 4.134 19.59 4.063 19.195 4.031 M 21.673 5.638 C 21.385 5.074 20.926 4.615 20.362 4.327 M 21.969 6.805 C 21.937 6.41 21.866 6.017 21.673 5.638 M 22 8.162 C 22 7.634 22 7.18 21.969 6.805 M 22 15.839 L 22 8.162 M 21.969 17.195 C 22 16.821 22 16.366 22 15.839 M 21.673 18.362 C 21.866 17.984 21.937 17.59 21.969 17.195 M 20.362 19.673 C 20.926 19.385 21.385 18.927 21.673 18.362 M 19.195 19.97 C 19.59 19.937 19.984 19.866 20.362 19.673 M 17.839 20 C 18.366 20 18.82 20 19.195 19.97 M 4.161 20 L 17.839 20 M 2.805 19.97 C 3.18 20 3.634 20 4.161 20 M 1.638 19.673 C 2.016 19.866 2.41 19.937 2.805 19.97 M 0.327 18.362 C 0.615 18.927 1.074 19.385 1.638 19.673 M 0.031 17.195 C 0.063 17.59 0.134 17.984 0.327 18.362 M 0 15.839 C 0 16.366 0 16.821 0.031 17.195 M 0 8.162 L 0 15.839 M 0.031 6.805 C 0 7.18 0 7.634 0 8.162 M 0.327 5.638 C 0.134 6.017 0.063 6.41 0.031 6.805 M 1.638 4.327 C 1.074 4.615 0.615 5.074 0.327 5.638 M 2.805 4.031 C 2.41 4.063 2.016 4.134 1.638 4.327 M 4.161 4 C 3.634 4 3.18 4 2.805 4.031 M 6.008 4 L 4.161 4 M 6.136 2.965 C 6.054 3.272 6.021 3.608 6.008 4 M 8.965 0.136 C 7.584 0.506 6.506 1.584 6.136 2.965 M 10.862 0 C 10.067 0 9.476 -0.001 8.965 0.136 Z M 4.2 6 L 6 6 M 2.968 6.024 C 3.251 6.001 3.623 6 4.2 6 M 2.546 6.109 C 2.595 6.084 2.696 6.046 2.968 6.024 M 2.109 6.546 C 2.205 6.358 2.358 6.205 2.546 6.109 M 2.024 6.968 C 2.046 6.696 2.084 6.596 2.109 6.546 M 2 8.2 C 2 7.624 2.001 7.251 2.024 6.968 M 2 15.8 L 2 8.2 M 2.024 17.032 C 2.001 16.749 2 16.377 2 15.8 M 2.109 17.454 C 2.084 17.405 2.046 17.304 2.024 17.032 M 2.546 17.891 C 2.358 17.795 2.205 17.642 2.109 17.454 M 2.968 17.976 C 2.696 17.954 2.595 17.916 2.546 17.891 M 4.2 18 C 3.623 18 3.251 17.999 2.968 17.976 M 6 18 L 4.2 18 M 6 6 L 6 18 Z M 8 18 L 8 6 L 14 6 L 14 18 L 8 18 Z M 17.8 18 L 16 18 M 19.032 17.976 C 18.749 17.999 18.377 18 17.8 18 M 19.454 17.891 C 19.405 17.916 19.304 17.954 19.032 17.976 M 19.891 17.454 C 19.795 17.642 19.642 17.795 19.454 17.891 M 19.976 17.032 C 19.954 17.304 19.916 17.405 19.891 17.454 M 20 15.8 C 20 16.377 19.999 16.749 19.976 17.032 M 20 8.2 L 20 15.8 M 19.976 6.968 C 19.999 7.251 20 7.624 20 8.2 M 19.891 6.546 C 19.916 6.596 19.954 6.696 19.976 6.968 M 19.454 6.109 C 19.642 6.205 19.795 6.358 19.891 6.546 M 19.032 6.024 C 19.304 6.046 19.405 6.084 19.454 6.109 M 17.8 6 C 18.377 6 18.749 6.001 19.032 6.024 M 16 6 L 17.8 6 M 16 18 L 16 6 Z M 13.99 4 L 8.01 4 C 8.019 3.743 8.036 3.601 8.068 3.482 C 8.253 2.792 8.792 2.253 9.482 2.068 C 9.705 2.009 10.006 2 11 2 C 11.994 2 12.295 2.009 12.518 2.068 C 13.208 2.253 13.747 2.792 13.932 3.482 C 13.964 3.601 13.981 3.743 13.99 4 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 1 2)\"/>"
    },
    "CheckVerified01": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 14.134 1.154 C 12.328 -0.385 9.672 -0.385 7.866 1.154 M 13.492 1.908 L 14.134 1.154 M 14.134 1.154 L 13.492 1.908 M 15.746 1.822 C 15.152 1.774 14.588 1.541 14.134 1.154 M 20.178 6.254 C 19.989 3.889 18.111 2.011 15.746 1.822 M 20.846 7.866 C 20.459 7.412 20.226 6.848 20.178 6.254 M 20.846 14.134 C 22.385 12.328 22.385 9.672 20.846 7.866 M 20.178 15.746 C 20.226 15.152 20.459 14.588 20.846 14.134 M 15.746 20.178 C 18.111 19.989 19.989 18.111 20.178 15.746 M 14.134 20.846 C 14.588 20.459 15.152 20.226 15.746 20.178 M 7.866 20.846 C 9.672 22.385 12.328 22.385 14.134 20.846 M 6.254 20.178 C 6.848 20.226 7.412 20.459 7.866 20.846 M 1.822 15.746 C 2.011 18.111 3.889 19.989 6.254 20.178 M 1.154 14.134 C 1.541 14.588 1.774 15.152 1.822 15.746 M 1.908 13.492 L 1.154 14.134 M 1.154 14.134 L 1.908 13.492 M 1.154 7.866 C -0.385 9.672 -0.385 12.328 1.154 14.134 M 1.822 6.254 C 1.774 6.848 1.541 7.412 1.154 7.866 M 6.254 1.822 C 3.889 2.011 2.011 3.889 1.822 6.254 M 7.866 1.154 C 7.412 1.541 6.848 1.774 6.254 1.822 Z M 9.163 2.677 C 10.222 1.774 11.778 1.774 12.837 2.677 M 6.413 3.816 C 7.427 3.735 8.389 3.336 9.163 2.677 M 3.816 6.413 C 3.926 5.027 5.027 3.926 6.413 3.816 M 2.677 9.163 C 3.336 8.389 3.735 7.427 3.816 6.413 M 2.677 12.837 C 1.774 11.778 1.774 10.222 2.677 9.163 M 1.915 13.486 L 2.677 12.837 L 1.915 13.486 M 3.816 15.587 C 3.735 14.573 3.336 13.611 2.677 12.837 M 6.413 18.184 C 5.027 18.074 3.926 16.973 3.816 15.587 M 9.163 19.323 C 8.389 18.664 7.427 18.265 6.413 18.184 M 12.837 19.323 C 11.778 20.226 10.222 20.226 9.163 19.323 M 15.587 18.184 C 14.573 18.265 13.611 18.664 12.837 19.323 M 18.184 15.587 C 18.074 16.973 16.973 18.074 15.587 18.184 M 19.323 12.837 C 18.664 13.611 18.265 14.573 18.184 15.587 M 19.323 9.163 C 20.226 10.222 20.226 11.778 19.323 12.837 M 18.184 6.413 C 18.265 7.427 18.664 8.389 19.323 9.163 M 15.587 3.816 C 16.973 3.926 18.074 5.027 18.184 6.413 M 12.837 2.677 C 13.611 3.336 14.573 3.735 15.587 3.816 Z M 15.207 9.207 C 15.598 8.817 15.598 8.183 15.207 7.793 M 10.707 13.707 L 15.207 9.207 M 9.293 13.707 C 9.683 14.098 10.317 14.098 10.707 13.707 M 7.293 11.707 L 9.293 13.707 M 7.293 10.293 C 6.902 10.683 6.902 11.317 7.293 11.707 M 8.707 10.293 C 8.317 9.902 7.683 9.902 7.293 10.293 M 10 11.586 L 8.707 10.293 M 13.793 7.793 L 10 11.586 M 15.207 7.793 C 14.817 7.402 14.183 7.402 13.793 7.793 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 1 1)\"/>"
    },
    "ChevronDown": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 1.707 0.293 C 1.317 -0.098 0.683 -0.098 0.293 0.293 M 7 5.586 L 1.707 0.293 M 12.293 0.293 L 7 5.586 M 13.707 0.293 C 13.317 -0.098 12.683 -0.098 12.293 0.293 M 13.707 1.707 C 14.098 1.317 14.098 0.683 13.707 0.293 M 7.707 7.707 L 13.707 1.707 M 6.293 7.707 C 6.683 8.098 7.317 8.098 7.707 7.707 M 0.293 1.707 L 6.293 7.707 M 0.293 0.293 C -0.098 0.683 -0.098 1.317 0.293 1.707 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 5 8)\"/>"
    },
    "ChevronDownFilled": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 1.707 0.293 C 1.317 -0.098 0.683 -0.098 0.293 0.293 M 7 5.586 L 1.707 0.293 M 12.293 0.293 L 7 5.586 M 13.707 0.293 C 13.317 -0.098 12.683 -0.098 12.293 0.293 M 13.707 1.707 C 14.098 1.317 14.098 0.683 13.707 0.293 M 7.707 7.707 L 13.707 1.707 M 6.293 7.707 C 6.683 8.098 7.317 8.098 7.707 7.707 M 0.293 1.707 L 6.293 7.707 M 0.293 0.293 C -0.098 0.683 -0.098 1.317 0.293 1.707 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 5 8)\"/>"
    },
    "ChevronUp": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 7.707 0.293 C 7.317 -0.098 6.683 -0.098 6.293 0.293 M 13.707 6.293 L 7.707 0.293 M 13.707 7.707 C 14.098 7.317 14.098 6.683 13.707 6.293 M 12.293 7.707 C 12.683 8.098 13.317 8.098 13.707 7.707 M 7 2.414 L 12.293 7.707 M 1.707 7.707 L 7 2.414 M 0.293 7.707 C 0.683 8.098 1.317 8.098 1.707 7.707 M 0.293 6.293 C -0.098 6.683 -0.098 7.317 0.293 7.707 M 6.293 0.293 L 0.293 6.293 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 5 8)\"/>"
    },
    "Circle": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 2 11 C 2 6.029 6.029 2 11 2 M 11 20 C 6.029 20 2 15.971 2 11 M 20 11 C 20 15.971 15.971 20 11 20 M 11 2 C 15.971 2 20 6.029 20 11 Z M 11 0 C 4.925 0 0 4.925 0 11 M 22 11 C 22 4.925 17.075 0 11 0 M 11 22 C 17.075 22 22 17.075 22 11 M 0 11 C 0 17.075 4.925 22 11 22 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 1 1)\"/>"
    },
    "Delete": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 3 18 C 2.45 18 1.979 17.804 1.587 17.413 C 1.196 17.021 1 16.55 1 16 L 1 3 L 0 3 L 0 1 L 5 1 L 5 0 L 11 0 L 11 1 L 16 1 L 16 3 L 15 3 L 15 16 C 15 16.55 14.804 17.021 14.413 17.413 C 14.021 17.804 13.55 18 13 18 L 3 18 Z M 5 14 L 7 14 L 7 5 L 5 5 L 5 14 Z M 9 14 L 11 14 L 11 5 L 9 5 L 9 14 Z\" fill=\"currentColor\" fill-rule=\"evenodd\" transform=\"matrix(1 0 0 1 4 3)\"/>"
    },
    "HelpCircle": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 2 11 C 2 6.029 6.029 2 11 2 M 11 20 C 6.029 20 2 15.971 2 11 M 20 11 C 20 15.971 15.971 20 11 20 M 11 2 C 15.971 2 20 6.029 20 11 Z M 11 0 C 4.925 0 0 4.925 0 11 M 22 11 C 22 4.925 17.075 0 11 0 M 11 22 C 17.075 22 22 17.075 22 11 M 0 11 C 0 17.075 4.925 22 11 22 Z M 9.907 7.271 C 10.314 7.032 10.793 6.944 11.258 7.024 M 9.033 8.332 C 9.19 7.886 9.499 7.511 9.907 7.271 M 7.758 8.943 C 8.279 9.127 8.85 8.853 9.033 8.332 M 7.147 7.668 C 6.963 8.189 7.237 8.76 7.758 8.943 M 8.893 5.547 C 8.079 6.026 7.46 6.777 7.147 7.668 M 11.596 5.053 C 10.665 4.893 9.708 5.068 8.893 5.547 M 13.98 6.42 C 13.372 5.697 12.527 5.213 11.596 5.053 M 14.92 9.001 C 14.921 8.056 14.588 7.142 13.98 6.42 M 12.975 12.082 C 13.785 11.542 14.92 10.531 14.92 9.001 M 11.795 12.726 C 12.111 12.586 12.539 12.372 12.975 12.082 M 11.405 12.888 C 11.502 12.851 11.636 12.797 11.795 12.726 M 11.289 12.93 C 11.317 12.92 11.357 12.906 11.405 12.888 M 11.254 12.943 L 11.289 12.93 M 11.243 12.946 L 11.254 12.943 M 11.239 12.948 L 11.243 12.946 M 11.237 12.948 L 11.239 12.948 M 10.92 12 C 11.236 12.949 11.237 12.948 11.237 12.948 M 11.236 12.949 L 10.92 12 M 9.971 12.316 C 10.146 12.84 10.712 13.123 11.236 12.949 M 10.603 11.051 C 10.08 11.226 9.797 11.792 9.971 12.316 M 10.619 11.046 L 10.603 11.051 M 10.693 11.019 C 10.659 11.031 10.634 11.041 10.619 11.046 M 10.983 10.899 C 10.861 10.953 10.76 10.993 10.693 11.019 M 11.865 10.418 C 11.551 10.628 11.229 10.789 10.983 10.899 M 12.92 9 C 12.92 9.469 12.555 9.958 11.865 10.418 M 12.92 8.999 L 12.92 9 M 12.45 7.708 C 12.754 8.069 12.921 8.526 12.92 8.999 M 11.258 7.024 C 11.724 7.104 12.146 7.346 12.45 7.708 Z M 11 15 C 10.448 15 10 15.448 10 16 M 11.01 15 L 11 15 M 12.01 16 C 12.01 15.448 11.562 15 11.01 15 M 11.01 17 C 11.562 17 12.01 16.552 12.01 16 M 11 17 L 11.01 17 M 10 16 C 10 16.552 10.448 17 11 17 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 1 1)\"/>"
    },
    "HxClipboardDuotone": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 0 1.6 C 0 1.04 0 0.76 0.109 0.546 C 0.205 0.358 0.358 0.205 0.546 0.109 C 0.76 0 1.04 0 1.6 0 L 6.4 0 C 6.96 0 7.24 0 7.454 0.109 C 7.642 0.205 7.795 0.358 7.891 0.546 C 8 0.76 8 1.04 8 1.6 L 8 2.4 C 8 2.96 8 3.24 7.891 3.454 C 7.795 3.642 7.642 3.795 7.454 3.891 C 7.24 4 6.96 4 6.4 4 L 1.6 4 C 1.04 4 0.76 4 0.546 3.891 C 0.358 3.795 0.205 3.642 0.109 3.454 C 0 3.24 0 2.96 0 2.4 L 0 1.6 Z\" fill=\"currentColor\" fill-rule=\"evenodd\" transform=\"matrix(1 0 0 1 8 2)\"/><path d=\"M 4 1.6 C 4 1.04 4 0.76 4.109 0.546 C 4.205 0.358 4.358 0.205 4.546 0.109 C 4.76 0 5.04 0 5.6 0 L 10.4 0 C 10.96 0 11.24 0 11.454 0.109 C 11.642 0.205 11.795 0.358 11.891 0.546 C 12 0.76 12 1.04 12 1.6 L 12 2.4 C 12 2.96 12 3.24 11.891 3.454 C 11.795 3.642 11.642 3.795 11.454 3.891 C 11.24 4 10.96 4 10.4 4 L 5.6 4 C 5.04 4 4.76 4 4.546 3.891 C 4.358 3.795 4.205 3.642 4.109 3.454 C 4 3.24 4 2.96 4 2.4 L 4 1.6 Z\" fill=\"currentColor\" fill-rule=\"evenodd\" transform=\"matrix(1 0 0 1 4 2)\"/>"
    },
    "HxFile06": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 11 0 L 5.759 0 M 11.707 0.293 C 11.52 0.105 11.265 0 11 0 M 17.707 6.293 L 11.707 0.293 M 18 7 C 18 6.735 17.895 6.48 17.707 6.293 M 18 16.241 L 18 7 M 17.956 18.252 C 18 17.711 18 17.046 18 16.241 M 17.564 19.816 C 17.811 19.331 17.91 18.814 17.956 18.252 M 15.816 21.564 C 16.569 21.181 17.181 20.569 17.564 19.816 M 14.252 21.956 C 14.814 21.91 15.331 21.811 15.816 21.564 M 12.241 22 C 13.046 22 13.711 22 14.252 21.956 M 5.759 22 L 12.241 22 M 3.748 21.956 C 4.289 22 4.954 22 5.759 22 M 2.184 21.564 C 2.669 21.811 3.186 21.91 3.748 21.956 M 0.436 19.816 C 0.819 20.569 1.431 21.181 2.184 21.564 M 0.044 18.252 C 0.09 18.814 0.189 19.331 0.436 19.816 M 0 16.241 C 0 17.046 0 17.711 0.044 18.252 M 0 5.759 L 0 16.241 M 0.044 3.748 C 0 4.289 0 4.954 0 5.759 M 0.436 2.184 C 0.189 2.669 0.09 3.186 0.044 3.748 M 2.184 0.436 C 1.431 0.819 0.819 1.431 0.436 2.184 M 3.748 0.044 C 3.186 0.09 2.669 0.189 2.184 0.436 M 5.759 0 C 4.954 0 4.289 0 3.748 0.044 Z M 3.092 2.218 C 3.248 2.138 3.473 2.073 3.911 2.038 M 2.218 3.092 C 2.41 2.716 2.716 2.41 3.092 2.218 M 2.038 3.911 C 2.073 3.473 2.138 3.248 2.218 3.092 M 2 5.8 C 2 4.943 2.001 4.361 2.038 3.911 M 2 16.2 L 2 5.8 M 2.038 18.089 C 2.001 17.639 2 17.057 2 16.2 M 2.218 18.908 C 2.138 18.752 2.073 18.527 2.038 18.089 M 3.092 19.782 C 2.716 19.59 2.41 19.284 2.218 18.908 M 3.911 19.962 C 3.473 19.927 3.248 19.862 3.092 19.782 M 5.8 20 C 4.943 20 4.361 19.999 3.911 19.962 M 12.2 20 L 5.8 20 M 14.089 19.962 C 13.639 19.999 13.057 20 12.2 20 M 14.908 19.782 C 14.752 19.862 14.527 19.927 14.089 19.962 M 15.782 18.908 C 15.59 19.284 15.284 19.59 14.908 19.782 M 15.962 18.089 C 15.927 18.527 15.862 18.752 15.782 18.908 M 16 16.2 C 16 17.057 15.999 17.639 15.962 18.089 M 16 8 L 16 16.2 M 12.568 8 L 16 8 M 11.862 7.983 C 12.07 8 12.316 8 12.568 8 M 11.092 7.782 C 11.363 7.92 11.633 7.964 11.862 7.983 M 10.218 6.908 C 10.41 7.284 10.716 7.59 11.092 7.782 M 10.017 6.138 C 10.036 6.367 10.08 6.637 10.218 6.908 M 10 5.432 C 10 5.684 10 5.93 10.017 6.138 M 10 2 L 10 5.432 M 5.8 2 L 10 2 M 3.911 2.038 C 4.361 2.001 4.943 2 5.8 2 Z M 12 3.414 L 14.586 6 L 12.6 6 C 12.303 6 12.141 5.999 12.025 5.99 C 12.02 5.989 12.016 5.989 12.011 5.989 C 12.011 5.984 12.011 5.98 12.01 5.975 C 12.001 5.859 12 5.697 12 5.4 L 12 3.414 Z M 5 7 C 4.448 7 4 7.448 4 8 M 7 7 L 5 7 M 8 8 C 8 7.448 7.552 7 7 7 M 7 9 C 7.552 9 8 8.552 8 8 M 5 9 L 7 9 M 4 8 C 4 8.552 4.448 9 5 9 Z M 5 11 C 4.448 11 4 11.448 4 12 M 13 11 L 5 11 M 14 12 C 14 11.448 13.552 11 13 11 M 13 13 C 13.552 13 14 12.552 14 12 M 5 13 L 13 13 M 4 12 C 4 12.552 4.448 13 5 13 Z M 5 15 C 4.448 15 4 15.448 4 16 M 13 15 L 5 15 M 14 16 C 14 15.448 13.552 15 13 15 M 13 17 C 13.552 17 14 16.552 14 16 M 5 17 L 13 17 M 4 16 C 4 16.552 4.448 17 5 17 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 3 1)\"/>"
    },
    "HxHome02": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 10.523 0.07 C 10.181 -0.023 9.82 -0.023 9.477 0.07 M 11.522 0.649 C 11.255 0.44 10.92 0.177 10.523 0.07 M 11.596 0.708 C 11.572 0.689 11.547 0.669 11.522 0.649 M 18.379 5.983 L 11.596 0.708 M 18.456 6.043 C 18.431 6.023 18.405 6.003 18.379 5.983 M 19.412 6.927 C 19.165 6.593 18.833 6.336 18.456 6.043 M 19.889 7.903 C 19.791 7.551 19.629 7.221 19.412 6.927 M 20 9.2 C 20.001 8.723 20.001 8.303 19.889 7.903 M 20 9.298 C 20 9.265 20 9.232 20 9.2 M 20 16.572 L 20 9.298 M 19.97 17.928 C 20 17.554 20 17.099 20 16.572 M 19.673 19.095 C 19.866 18.717 19.937 18.324 19.97 17.928 M 18.362 20.406 C 18.927 20.119 19.386 19.66 19.673 19.095 M 17.195 20.703 C 17.591 20.67 17.984 20.599 18.362 20.406 M 15.839 20.733 C 16.366 20.733 16.821 20.733 17.195 20.703 M 4.162 20.733 L 15.839 20.733 M 2.805 20.703 C 3.18 20.733 3.634 20.733 4.162 20.733 M 1.638 20.406 C 2.017 20.599 2.41 20.67 2.805 20.703 M 0.327 19.095 C 0.615 19.66 1.074 20.119 1.638 20.406 M 0.031 17.928 C 0.063 18.324 0.134 18.717 0.327 19.095 M 0 16.572 C 0 17.099 0 17.554 0.031 17.928 M 0 9.298 L 0 16.572 M 0 9.2 C 0 9.232 0 9.265 0 9.298 M 0.111 7.903 C -0.001 8.303 0 8.723 0 9.2 M 0.588 6.927 C 0.371 7.221 0.21 7.551 0.111 7.903 M 1.544 6.043 C 1.167 6.336 0.835 6.593 0.588 6.927 M 1.622 5.983 C 1.595 6.003 1.57 6.023 1.544 6.043 M 8.404 0.708 L 1.622 5.983 M 8.479 0.649 C 8.453 0.669 8.428 0.689 8.404 0.708 M 9.477 0.07 C 9.08 0.177 8.746 0.44 8.479 0.649 Z M 12 18.733 L 8 18.733 M 12 12.333 L 12 18.733 M 11.99 11.758 C 11.999 11.874 12 12.037 12 12.333 M 11.989 11.745 C 11.989 11.749 11.989 11.753 11.99 11.758 M 11.976 11.743 C 11.98 11.744 11.985 11.744 11.989 11.745 M 11.4 11.733 C 11.697 11.733 11.859 11.734 11.976 11.743 M 8.6 11.733 L 11.4 11.733 M 8.025 11.743 C 8.141 11.734 8.304 11.733 8.6 11.733 M 8.012 11.745 C 8.016 11.744 8.02 11.744 8.025 11.743 M 8.01 11.758 C 8.011 11.753 8.011 11.749 8.012 11.745 M 8 12.333 C 8 12.037 8.001 11.874 8.01 11.758 M 8 18.733 L 8 12.333 Z M 14 18.733 L 14 12.301 C 14 12.049 14 11.803 13.983 11.595 C 13.965 11.366 13.92 11.097 13.782 10.825 C 13.59 10.449 13.284 10.143 12.908 9.951 C 12.637 9.813 12.367 9.769 12.138 9.75 C 11.93 9.733 11.684 9.733 11.432 9.733 L 8.568 9.733 C 8.316 9.733 8.07 9.733 7.862 9.75 C 7.633 9.769 7.364 9.813 7.092 9.951 C 6.716 10.143 6.41 10.449 6.218 10.825 C 6.08 11.097 6.036 11.366 6.017 11.595 C 6 11.803 6 12.049 6 12.301 L 6 18.733 L 4.2 18.733 C 3.624 18.733 3.251 18.732 2.968 18.709 C 2.696 18.687 2.596 18.649 2.546 18.624 C 2.358 18.528 2.205 18.375 2.109 18.187 C 2.084 18.138 2.046 18.037 2.024 17.765 C 2.001 17.482 2 17.11 2 16.533 L 2 9.298 C 2 8.667 2.009 8.543 2.037 8.442 C 2.07 8.325 2.124 8.214 2.196 8.117 C 2.259 8.032 2.351 7.949 2.849 7.562 L 9.632 2.287 C 9.819 2.141 9.918 2.065 9.993 2.015 C 9.995 2.013 9.998 2.011 10 2.01 C 10.002 2.011 10.005 2.013 10.007 2.015 C 10.083 2.065 10.182 2.141 10.369 2.287 L 17.151 7.562 C 17.649 7.949 17.742 8.032 17.804 8.117 C 17.876 8.214 17.93 8.325 17.963 8.442 C 17.991 8.543 18 8.667 18 9.298 L 18 16.533 C 18 17.11 17.999 17.482 17.976 17.765 C 17.954 18.037 17.916 18.138 17.891 18.187 C 17.795 18.375 17.642 18.528 17.454 18.624 C 17.405 18.649 17.304 18.687 17.032 18.709 C 16.749 18.732 16.377 18.733 15.8 18.733 L 14 18.733 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 2.000 1.267)\"/>"
    },
    "HxTrendDown01Filled": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 0.293 0.293 C 0.683 -0.098 1.317 -0.098 1.707 0.293 M 0.293 1.707 C -0.098 1.317 -0.098 0.683 0.293 0.293 M 5.184 6.598 L 0.293 1.707 M 5.696 7.086 C 5.536 6.951 5.363 6.777 5.184 6.598 M 6.382 7.488 C 6.092 7.394 5.87 7.234 5.696 7.086 M 7.618 7.488 C 7.216 7.618 6.784 7.618 6.382 7.488 M 8.304 7.086 C 8.13 7.234 7.908 7.394 7.618 7.488 M 8.816 6.598 C 8.637 6.777 8.464 6.951 8.304 7.086 M 11.576 3.838 L 8.816 6.598 M 11.99 3.439 C 11.901 3.515 11.785 3.629 11.576 3.838 M 12 3.43 L 11.99 3.439 M 12.01 3.439 L 12 3.43 M 12.424 3.838 C 12.215 3.629 12.099 3.515 12.01 3.439 M 18.586 10 L 12.424 3.838 M 14 10 L 18.586 10 M 13 11 C 13 10.448 13.448 10 14 10 M 14 12 C 13.448 12 13 11.552 13 11 M 21 12 L 14 12 M 22 11 C 22 11.552 21.552 12 21 12 M 22 4 L 22 11 M 21 3 C 21.552 3 22 3.448 22 4 M 20 4 C 20 3.448 20.448 3 21 3 M 20 8.586 L 20 4 M 13.816 2.402 L 20 8.586 M 13.304 1.914 C 13.464 2.049 13.637 2.223 13.816 2.402 M 12.618 1.512 C 12.908 1.606 13.13 1.766 13.304 1.914 M 11.382 1.512 C 11.784 1.382 12.216 1.382 12.618 1.512 M 10.696 1.914 C 10.87 1.766 11.092 1.606 11.382 1.512 M 10.184 2.402 C 10.363 2.223 10.536 2.049 10.696 1.914 M 7.424 5.162 L 10.184 2.402 M 7.01 5.561 C 7.099 5.485 7.215 5.371 7.424 5.162 M 7 5.57 L 7.01 5.561 M 6.99 5.561 L 7 5.57 M 6.576 5.162 C 6.785 5.371 6.901 5.485 6.99 5.561 M 1.707 0.293 L 6.576 5.162 Z\" fill=\"currentColor\" fill-rule=\"evenodd\" transform=\"matrix(1 0 0 1 1 6)\"/>"
    },
    "HxTrendUp01Filled": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 13 1 C 13 0.448 13.448 0 14 0 M 14 2 C 13.448 2 13 1.552 13 1 M 18.586 2 L 14 2 M 12.424 8.162 L 18.586 2 M 12.01 8.561 C 12.099 8.485 12.215 8.371 12.424 8.162 M 12 8.57 L 12.01 8.561 M 11.99 8.561 L 12 8.57 M 11.576 8.162 C 11.785 8.371 11.901 8.485 11.99 8.561 M 8.816 5.402 L 11.576 8.162 M 8.304 4.914 C 8.464 5.049 8.637 5.223 8.816 5.402 M 7.618 4.512 C 7.908 4.606 8.13 4.766 8.304 4.914 M 6.382 4.512 C 6.784 4.382 7.216 4.382 7.618 4.512 M 5.696 4.914 C 5.87 4.766 6.092 4.606 6.382 4.512 M 5.184 5.402 C 5.363 5.223 5.536 5.049 5.696 4.914 M 0.293 10.293 L 5.184 5.402 M 0.293 11.707 C -0.098 11.317 -0.098 10.683 0.293 10.293 M 1.707 11.707 C 1.317 12.098 0.683 12.098 0.293 11.707 M 6.576 6.838 L 1.707 11.707 M 6.99 6.439 C 6.901 6.515 6.785 6.629 6.576 6.838 M 7 6.43 L 6.99 6.439 M 7.01 6.439 L 7 6.43 M 7.424 6.838 C 7.215 6.629 7.099 6.515 7.01 6.439 M 10.184 9.598 L 7.424 6.838 M 10.696 10.086 C 10.536 9.951 10.363 9.777 10.184 9.598 M 11.382 10.488 C 11.092 10.394 10.87 10.234 10.696 10.086 M 12.618 10.488 C 12.216 10.618 11.784 10.618 11.382 10.488 M 13.304 10.086 C 13.13 10.234 12.908 10.394 12.618 10.488 M 13.816 9.598 C 13.637 9.777 13.464 9.951 13.304 10.086 M 20 3.414 L 13.816 9.598 M 20 8 L 20 3.414 M 21 9 C 20.448 9 20 8.552 20 8 M 22 8 C 22 8.552 21.552 9 21 9 M 22 1 L 22 8 M 21 0 C 21.552 0 22 0.448 22 1 M 14 0 L 21 0 Z\" fill=\"currentColor\" fill-rule=\"evenodd\" transform=\"matrix(1 0 0 1 1 6)\"/>"
    },
    "IconCheck": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 17.707 1.707 C 18.098 1.317 18.098 0.683 17.707 0.293 M 6.707 12.707 L 17.707 1.707 M 5.293 12.707 C 5.683 13.098 6.317 13.098 6.707 12.707 M 0.293 7.707 L 5.293 12.707 M 0.293 6.293 C -0.098 6.683 -0.098 7.317 0.293 7.707 M 1.707 6.293 C 1.317 5.902 0.683 5.902 0.293 6.293 M 6 10.586 L 1.707 6.293 M 16.293 0.293 L 6 10.586 M 17.707 0.293 C 17.317 -0.098 16.683 -0.098 16.293 0.293 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 3 5)\"/>"
    },
    "LogOut01": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 7 0 L 5.759 0 M 8 1 C 8 0.448 7.552 0 7 0 M 7 2 C 7.552 2 8 1.552 8 1 M 5.8 2 L 7 2 M 3.911 2.038 C 4.361 2.001 4.943 2 5.8 2 M 3.092 2.218 C 3.248 2.138 3.473 2.073 3.911 2.038 M 2.218 3.092 C 2.41 2.716 2.716 2.41 3.092 2.218 M 2.038 3.911 C 2.073 3.473 2.138 3.248 2.218 3.092 M 2 5.8 C 2 4.943 2.001 4.361 2.038 3.911 M 2 14.2 L 2 5.8 M 2.038 16.089 C 2.001 15.639 2 15.057 2 14.2 M 2.218 16.908 C 2.138 16.752 2.073 16.527 2.038 16.089 M 3.092 17.782 C 2.716 17.59 2.41 17.284 2.218 16.908 M 3.911 17.962 C 3.473 17.927 3.248 17.862 3.092 17.782 M 5.8 18 C 4.943 18 4.361 17.999 3.911 17.962 M 7 18 L 5.8 18 M 8 19 C 8 18.448 7.552 18 7 18 M 7 20 C 7.552 20 8 19.552 8 19 M 5.759 20 L 7 20 M 3.748 19.956 C 4.289 20 4.954 20 5.759 20 M 2.184 19.564 C 2.669 19.811 3.186 19.91 3.748 19.956 M 0.436 17.816 C 0.819 18.569 1.431 19.181 2.184 19.564 M 0.044 16.252 C 0.09 16.814 0.189 17.331 0.436 17.816 M 0 14.241 C 0 15.046 0 15.711 0.044 16.252 M 0 5.759 L 0 14.241 M 0.044 3.748 C 0 4.289 0 4.954 0 5.759 M 0.436 2.184 C 0.189 2.669 0.09 3.186 0.044 3.748 M 2.184 0.436 C 1.431 0.819 0.819 1.431 0.436 2.184 M 3.748 0.044 C 3.186 0.09 2.669 0.189 2.184 0.436 M 5.759 0 C 4.954 0 4.289 0 3.748 0.044 Z M 14.707 4.293 C 14.317 3.902 13.683 3.902 13.293 4.293 M 19.707 9.293 L 14.707 4.293 M 19.707 10.707 C 20.098 10.317 20.098 9.683 19.707 9.293 M 14.707 15.707 L 19.707 10.707 M 13.293 15.707 C 13.683 16.098 14.317 16.098 14.707 15.707 M 13.293 14.293 C 12.902 14.683 12.902 15.317 13.293 15.707 M 16.586 11 L 13.293 14.293 M 7 11 L 16.586 11 M 6 10 C 6 10.552 6.448 11 7 11 M 7 9 C 6.448 9 6 9.448 6 10 M 16.586 9 L 7 9 M 13.293 5.707 L 16.586 9 M 13.293 4.293 C 12.902 4.683 12.902 5.317 13.293 5.707 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 2 2)\"/>"
    },
    "Mail01": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 16.241 0 L 5.759 0 M 18.252 0.044 C 17.711 0 17.046 0 16.241 0 M 19.816 0.436 C 19.331 0.189 18.814 0.09 18.252 0.044 M 21.564 2.184 C 21.181 1.431 20.569 0.819 19.816 0.436 M 21.951 3.689 C 21.903 3.15 21.803 2.652 21.564 2.184 M 21.982 4.19 C 22.014 4.025 22.004 3.853 21.951 3.689 M 22 5.759 C 22 5.16 22 4.64 21.982 4.19 M 22 12.241 L 22 5.759 M 21.956 14.252 C 22 13.711 22 13.046 22 12.241 M 21.564 15.816 C 21.811 15.331 21.91 14.814 21.956 14.252 M 19.816 17.564 C 20.569 17.181 21.181 16.569 21.564 15.816 M 18.252 17.956 C 18.814 17.91 19.331 17.811 19.816 17.564 M 16.241 18 C 17.046 18 17.711 18 18.252 17.956 M 5.759 18 L 16.241 18 M 3.748 17.956 C 4.289 18 4.954 18 5.759 18 M 2.184 17.564 C 2.669 17.811 3.186 17.91 3.748 17.956 M 0.436 15.816 C 0.82 16.569 1.431 17.181 2.184 17.564 M 0.044 14.252 C 0.09 14.814 0.189 15.331 0.436 15.816 M 0 12.241 C 0 13.046 0 13.711 0.044 14.252 M 0 5.759 L 0 12.241 M 0.018 4.19 C 0 4.64 0 5.16 0 5.759 M 0.049 3.689 C -0.004 3.853 -0.014 4.025 0.018 4.19 M 0.436 2.184 C 0.197 2.652 0.097 3.15 0.049 3.689 M 2.184 0.436 C 1.431 0.819 0.82 1.431 0.436 2.184 M 3.748 0.044 C 3.186 0.09 2.669 0.189 2.184 0.436 M 5.759 0 C 4.954 0 4.289 0 3.748 0.044 Z M 2 12.2 L 2 5.921 M 2.038 14.089 C 2.001 13.639 2 13.057 2 12.2 M 2.218 14.908 C 2.138 14.752 2.073 14.527 2.038 14.089 M 3.092 15.782 C 2.716 15.59 2.41 15.284 2.218 14.908 M 3.911 15.962 C 3.473 15.927 3.249 15.862 3.092 15.782 M 5.8 16 C 4.944 16 4.361 15.999 3.911 15.962 M 16.2 16 L 5.8 16 M 18.089 15.962 C 17.639 15.999 17.057 16 16.2 16 M 18.908 15.782 C 18.752 15.862 18.527 15.927 18.089 15.962 M 19.782 14.908 C 19.59 15.284 19.284 15.59 18.908 15.782 M 19.963 14.089 C 19.927 14.527 19.862 14.752 19.782 14.908 M 20 12.2 C 20 13.057 19.999 13.639 19.963 14.089 M 20 5.921 L 20 12.2 M 13.409 10.535 L 20 5.921 M 13.293 10.616 C 13.331 10.589 13.37 10.562 13.409 10.535 M 11.726 11.47 C 12.27 11.334 12.749 10.998 13.293 10.616 M 10.274 11.47 C 10.751 11.588 11.249 11.588 11.726 11.47 M 8.707 10.616 C 9.252 10.998 9.73 11.334 10.274 11.47 M 8.592 10.535 C 8.63 10.562 8.669 10.589 8.707 10.616 M 2 5.921 L 8.592 10.535 Z M 19.917 3.537 L 12.262 8.896 C 11.533 9.406 11.378 9.495 11.242 9.529 C 11.083 9.569 10.917 9.569 10.758 9.529 C 10.622 9.495 10.467 9.406 9.738 8.896 L 2.083 3.537 C 2.119 3.33 2.165 3.196 2.218 3.092 C 2.41 2.716 2.716 2.41 3.092 2.218 C 3.249 2.138 3.473 2.073 3.911 2.038 C 4.361 2.001 4.944 2 5.8 2 L 16.2 2 C 17.057 2 17.639 2.001 18.089 2.038 C 18.527 2.073 18.752 2.138 18.908 2.218 C 19.284 2.41 19.59 2.716 19.782 3.092 C 19.835 3.196 19.882 3.33 19.917 3.537 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 1 3)\"/>"
    },
    "Minus": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 1 0 C 0.448 0 0 0.448 0 1 M 15 0 L 1 0 M 16 1 C 16 0.448 15.552 0 15 0 M 15 2 C 15.552 2 16 1.552 16 1 M 1 2 L 15 2 M 0 1 C 0 1.552 0.448 2 1 2 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 4 11)\"/>"
    },
    "User01": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 5.5 5.5 C 5.5 3.567 7.067 2 9 2 M 9 9 C 7.067 9 5.5 7.433 5.5 5.5 M 12.5 5.5 C 12.5 7.433 10.933 9 9 9 M 9 2 C 10.933 2 12.5 3.567 12.5 5.5 Z M 9 0 C 5.963 0 3.5 2.462 3.5 5.5 M 14.5 5.5 C 14.5 2.462 12.038 0 9 0 M 9 11 C 12.038 11 14.5 8.538 14.5 5.5 M 3.5 5.5 C 3.5 8.538 5.963 11 9 11 Z M 6.5 12.5 C 6.441 12.5 6.383 12.5 6.326 12.5 M 11.5 12.5 L 6.5 12.5 M 11.674 12.5 C 11.617 12.5 11.559 12.5 11.5 12.5 M 14.452 12.715 C 13.739 12.499 12.901 12.499 11.674 12.5 M 17.785 16.049 C 17.3 14.451 16.05 13.2 14.452 12.715 M 18 18.826 C 18.001 17.599 18.001 16.761 17.785 16.049 M 18 19 C 18 18.941 18 18.883 18 18.826 M 17 20 C 17.552 20 18 19.552 18 19 M 16 19 C 16 19.552 16.448 20 17 20 M 15.871 16.629 C 15.989 17.019 16 17.532 16 19 M 13.871 14.629 C 14.83 14.92 15.58 15.67 15.871 16.629 M 11.5 14.5 C 12.968 14.5 13.481 14.511 13.871 14.629 M 6.5 14.5 L 11.5 14.5 M 4.129 14.629 C 4.519 14.511 5.032 14.5 6.5 14.5 M 2.129 16.629 C 2.42 15.67 3.17 14.92 4.129 14.629 M 2 19 C 2 17.532 2.011 17.019 2.129 16.629 M 1 20 C 1.552 20 2 19.552 2 19 M 0 19 C 0 19.552 0.448 20 1 20 M 0 18.826 C 0 18.883 0 18.941 0 19 M 0.215 16.049 C -0.001 16.761 0 17.599 0 18.826 M 3.549 12.715 C 1.951 13.2 0.7 14.451 0.215 16.049 M 6.326 12.5 C 5.099 12.499 4.261 12.499 3.549 12.715 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 3 2)\"/>"
    },
    "Users01": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 5.5 5 C 5.5 3.343 6.843 2 8.5 2 M 8.5 8 C 6.843 8 5.5 6.657 5.5 5 M 11.5 5 C 11.5 6.657 10.157 8 8.5 8 M 8.5 2 C 10.157 2 11.5 3.343 11.5 5 Z M 8.5 0 C 5.739 0 3.5 2.239 3.5 5 M 13.5 5 C 13.5 2.239 11.261 0 8.5 0 M 8.5 10 C 11.261 10 13.5 7.761 13.5 5 M 3.5 5 C 3.5 7.761 5.739 10 8.5 10 Z M 14.875 0.364 C 14.363 0.157 13.78 0.404 13.573 0.916 M 18 5 C 18 2.9 16.706 1.105 14.875 0.364 M 14.875 9.636 C 16.706 8.895 18 7.1 18 5 M 13.573 9.084 C 13.78 9.596 14.363 9.843 14.875 9.636 M 14.125 7.782 C 13.613 7.99 13.366 8.573 13.573 9.084 M 16 5 C 16 6.257 15.226 7.337 14.125 7.782 M 14.125 2.218 C 15.226 2.663 16 3.743 16 5 M 13.573 0.916 C 13.366 1.427 13.613 2.01 14.125 2.218 Z M 10.036 12 L 6.964 12 M 12.257 12.04 C 11.665 12 10.937 12 10.036 12 M 13.913 12.381 C 13.404 12.169 12.865 12.082 12.257 12.04 M 16.619 15.087 C 16.112 13.861 15.139 12.888 13.913 12.381 M 16.96 16.743 C 16.918 16.135 16.831 15.596 16.619 15.087 M 17 18.964 C 17 18.063 17 17.335 16.96 16.743 M 17 19 L 17 18.964 M 16 20 C 16.552 20 17 19.552 17 19 M 15 19 C 15 19.552 15.448 20 16 20 M 14.964 16.879 C 14.999 17.395 15 18.054 15 19 M 14.772 15.852 C 14.865 16.077 14.93 16.373 14.964 16.879 M 13.148 14.228 C 13.883 14.533 14.467 15.117 14.772 15.852 M 12.121 14.036 C 12.627 14.07 12.923 14.135 13.148 14.228 M 10 14 C 10.946 14 11.605 14.001 12.121 14.036 M 7 14 L 10 14 M 4.879 14.036 C 5.395 14.001 6.054 14 7 14 M 3.852 14.228 C 4.077 14.135 4.373 14.07 4.879 14.036 M 2.228 15.852 C 2.533 15.117 3.117 14.533 3.852 14.228 M 2.036 16.879 C 2.07 16.373 2.135 16.077 2.228 15.852 M 2 19 C 2 18.054 2.001 17.395 2.036 16.879 M 1 20 C 1.552 20 2 19.552 2 19 M 0 19 C 0 19.552 0.448 20 1 20 M 0 18.964 L 0 19 M 0.04 16.743 C 0 17.335 0 18.063 0 18.964 M 0.381 15.087 C 0.169 15.596 0.082 16.135 0.04 16.743 M 3.087 12.381 C 1.861 12.888 0.888 13.861 0.381 15.087 M 4.743 12.04 C 4.135 12.082 3.596 12.169 3.087 12.381 M 6.964 12 C 6.063 12 5.335 12 4.743 12.04 Z M 18.249 12.158 C 17.714 12.02 17.169 12.342 17.032 12.877 M 22 17 C 22 14.669 20.406 12.713 18.249 12.158 M 22 19 L 22 17 M 21 20 C 21.552 20 22 19.552 22 19 M 20 19 C 20 19.552 20.448 20 21 20 M 20 17 L 20 19 M 17.751 14.094 C 19.045 14.428 20 15.603 20 17 M 17.032 12.877 C 16.894 13.412 17.216 13.957 17.751 14.094 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 1 2)\"/>"
    },
    "XClose": {
      viewBox: "0 0 24 24",
      body: "<path d=\"M 1.707 0.293 C 1.317 -0.098 0.683 -0.098 0.293 0.293 M 7 5.586 L 1.707 0.293 M 12.293 0.293 L 7 5.586 M 13.707 0.293 C 13.317 -0.098 12.683 -0.098 12.293 0.293 M 13.707 1.707 C 14.098 1.317 14.098 0.683 13.707 0.293 M 8.414 7 L 13.707 1.707 M 13.707 12.293 L 8.414 7 M 13.707 13.707 C 14.098 13.317 14.098 12.683 13.707 12.293 M 12.293 13.707 C 12.683 14.098 13.317 14.098 13.707 13.707 M 7 8.414 L 12.293 13.707 M 1.707 13.707 L 7 8.414 M 0.293 13.707 C 0.683 14.098 1.317 14.098 1.707 13.707 M 0.293 12.293 C -0.098 12.683 -0.098 13.317 0.293 13.707 M 5.586 7 L 0.293 12.293 M 0.293 1.707 L 5.586 7 M 0.293 0.293 C -0.098 0.683 -0.098 1.317 0.293 1.707 Z\" fill=\"currentColor\" fill-rule=\"nonzero\" transform=\"matrix(1 0 0 1 5 5)\"/>"
    }
  };
} catch {}
Object.assign(__ds_scope, { __ds_default_components_icons_icon_data_12stud1 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/icon-data.js", error: String((e && e.message) || e) }); }

__ds_scope.__ds_default_components_icons_icon_data_12stud1$1nb03e1 = __ds_scope.__ds_default_components_icons_icon_data_12stud1;

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Icon({
  name,
  size,
  ...rest
}) {
  const d = __ds_scope.__ds_default_components_icons_icon_data_12stud1$1nb03e1[name];
  if (!d) return null;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: d.viewBox,
    fill: "none"
    // body strings are emitter-controlled <path> markup — geometry,
    // numeric fills and transforms only; no .fig-authored text reaches them.
    ,
    dangerouslySetInnerHTML: {
      __html: d.body
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon, __ds_default_components_icons_Icon_fio49a: Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher-app/Activity.jsx
try { (() => {
// Start activity → pick class → pick activity type; plus Class overview
const ACTIVITY_TYPES = [['Know Myself', 'Activate Section A · Profile, Reflection & Planning'], ['Group project', 'Set up a shared project for learners to compete in teams '], ['Problem Based Enquiry', 'Set up tasks for individual learners that require them to propose solutions to a contemporary, real-world issue'], ['Class interaction', 'Plan and observe a classroom discussion, debate, lab experiment, simulation, role-play, dramatic presentation.']];
function StartActivity({
  back,
  go
}) {
  const [cls, setCls] = React.useState(null);
  const [step, setStep] = React.useState(0);
  const [type, setType] = React.useState(null);
  const {
    Icon
  } = HPC;
  if (step === 0) return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KitAppBar, {
    title: "Start a New Activity",
    onBack: back
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `600 24px/30px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, "Select the class"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(107,104,115)',
      padding: '4px 0'
    }
  }, "Please select the class to begin the activity")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, CLASSES.map(c => {
    const sel = cls === c.grade;
    return /*#__PURE__*/React.createElement("button", {
      key: c.grade,
      onClick: () => setCls(c.grade),
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        background: sel ? 'rgb(255,250,245)' : '#fff',
        border: `1px solid ${sel ? 'rgb(232,110,0)' : 'rgb(229,230,225)'}`,
        cursor: 'pointer',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 52,
        height: 52,
        borderRadius: 12,
        background: 'rgb(255,250,245)',
        boxShadow: 'inset 0 0 0 1px rgb(228,225,221)',
        display: 'grid',
        placeItems: 'center',
        font: '600 14px/20px Inter, sans-serif',
        color: 'rgb(181,74,69)',
        flexShrink: 0
      }
    }, c.grade), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: `600 14px/20px ${P}`,
        color: 'rgb(34,31,38)'
      }
    }, c.name), /*#__PURE__*/React.createElement("span", {
      style: {
        font: `400 13px/19px ${P}`,
        color: 'rgb(107,104,115)'
      }
    }, "46 students")), Icon && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'rgb(63,61,69)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 18
    })));
  }))), /*#__PURE__*/React.createElement(KitFooter, null, /*#__PURE__*/React.createElement(KitPrimaryButton, {
    disabled: !cls,
    onClick: () => setStep(1)
  }, "Continue")));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 68,
      flexShrink: 0,
      background: 'rgb(255,251,249)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 16px 0 8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(0),
    style: {
      width: 44,
      height: 44,
      border: 0,
      background: 'none',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer'
    }
  }, Icon && /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowLeft",
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: `600 18px/24px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, "Start activity"), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 40,
      borderRadius: 999,
      background: '#fff',
      border: '1px solid rgb(228,225,221)',
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      padding: '8px 12px 8px 14px',
      boxSizing: 'border-box',
      font: `700 15px/22px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, "Grade ", cls.replace(' ', ''), Icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgb(107,104,115)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ChevronDown",
    size: 14
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `600 24px/30px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, "Start activity for grade ", cls), /*#__PURE__*/React.createElement("div", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(107,104,115)',
      padding: '4px 0'
    }
  }, "Choose the type of activity you'd like to create.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ACTIVITY_TYPES.map(([t, s]) => /*#__PURE__*/React.createElement(KitOption, {
    key: t,
    title: t,
    sub: s,
    selected: type === t,
    onClick: () => setType(t)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(107,104,115)'
    }
  }, "Note : You can add details in the next step.")), /*#__PURE__*/React.createElement(KitFooter, null, /*#__PURE__*/React.createElement(KitPrimaryButton, {
    disabled: !type,
    onClick: () => go('class')
  }, "Continue")));
}
function ClassOverview({
  back,
  go
}) {
  const [tab, setTab] = React.useState(0);
  const {
    StudentOverviewCard,
    Icon
  } = HPC;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KitAppBar, {
    title: "Class 9 A",
    onBack: back
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `600 18px/24px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, "Class Overview"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 16,
      background: '#fff',
      border: '1px solid rgb(229,230,225)',
      padding: 16,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `600 24px/30px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, "46"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(107,104,115)'
    }
  }, "Students")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      padding: 4,
      borderRadius: 999,
      background: 'rgb(241,239,236)'
    }
  }, ['Live Activities', 'Student List'].map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTab(i),
    style: {
      flex: 1,
      height: 36,
      border: 0,
      borderRadius: 999,
      background: tab === i ? '#fff' : 'transparent',
      boxShadow: tab === i ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
      font: `${tab === i ? 600 : 400} 13px/19px ${P}`,
      color: tab === i ? 'rgb(34,31,38)' : 'rgb(107,104,115)',
      cursor: 'pointer'
    }
  }, t))), tab === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: '60px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(107,104,115)'
    }
  }, "No activities are live for class 9 A"), /*#__PURE__*/React.createElement("button", {
    onClick: () => go('activity'),
    style: {
      height: 40,
      borderRadius: 999,
      border: 0,
      background: 'rgb(255,121,0)',
      color: '#fff',
      font: `500 14px/20px ${P}`,
      padding: '0 20px',
      cursor: 'pointer'
    }
  }, "Start New Activity")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Om Kumar', 'Aarti Mehta', 'Kruanan Singh'].map((n, i) => StudentOverviewCard ? /*#__PURE__*/React.createElement("div", {
    key: n,
    onClick: () => go('profile'),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(StudentOverviewCard, {
    text1: n,
    text2: 'Roll No. : 12334' + i,
    showDetails: false,
    style: {
      width: '100%'
    }
  })) : null))));
}
Object.assign(window, {
  StartActivity,
  ClassOverview
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher-app/Activity.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher-app/Home.jsx
try { (() => {
// Core · 02 · Home (final version)
const CLASSES = [{
  grade: '9 A',
  name: 'Class 9 A',
  tint: 'rgb(191,195,251)'
}, {
  grade: '10 A',
  name: 'Class 10 A',
  tint: 'rgb(255,193,214)'
}, {
  grade: '11 B',
  name: 'Class 11 B',
  tint: 'rgb(255,239,209)'
}, {
  grade: '12 A',
  name: 'Class 12 - A - PCM',
  tint: 'rgb(203,236,242)'
}];
function QuickAction({
  primary,
  title,
  sub,
  img,
  onClick
}) {
  const {
    Icon
  } = HPC;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      position: 'relative',
      flex: 1,
      textAlign: 'left',
      cursor: 'pointer',
      borderRadius: 16,
      background: primary ? 'rgb(255,121,0)' : '#fff',
      border: '1px solid rgb(255,165,84)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      minHeight: 124,
      boxSizing: 'border-box',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: kitAsset(img),
    alt: "",
    style: {
      position: 'absolute',
      right: 10,
      top: primary ? 37 : 27,
      width: primary ? 58 : 62,
      height: primary ? 58 : 62,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `700 14px/24px ${P}`,
      color: primary ? '#fff' : '#000',
      whiteSpace: 'nowrap'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: primary ? 100 : 80,
      font: `400 12px/18px ${P}`,
      color: primary ? '#fff' : 'rgb(107,104,115)'
    }
  }, sub), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 50,
      background: primary ? '#fff' : 'rgb(255,121,0)',
      color: primary ? '#000' : '#fff',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, Icon && /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowRight",
    size: 16
  }))));
}
function ClassCard({
  c,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      textAlign: 'left',
      cursor: 'pointer',
      borderRadius: 18,
      background: c.tint,
      boxShadow: 'inset 0 0 0 1px rgb(229,230,225)',
      border: 0,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      minHeight: 180,
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 54,
      width: 54,
      borderRadius: 16,
      background: '#fff',
      boxShadow: 'inset 0 0 0 1px rgb(225,225,225)',
      display: 'grid',
      placeItems: 'center',
      font: '600 14px/20px Inter, sans-serif',
      color: 'rgb(181,74,69)'
    }
  }, c.grade), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `700 14px/20px ${P}`,
      color: 'rgb(32,35,31)'
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 14px/20px ${P}`,
      color: 'rgb(32,35,31)'
    }
  }, "46 students"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 14px/20px ${P}`,
      color: 'rgb(32,35,31)'
    }
  }, "Track class activities & live HPC")));
}
function Home({
  go
}) {
  const {
    Icon
  } = HPC;
  const hr = /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'rgb(228,225,221)',
      alignSelf: 'stretch'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(rgb(255,238,226), rgb(244,242,239) 60%, rgb(232,229,225))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 96,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      padding: 16,
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: kitAsset('logos/parakh.png'),
    alt: "PARAKH",
    style: {
      width: 52,
      height: 52,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 16px/22px ${P}`,
      color: 'rgb(100,116,139)'
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 18px/24px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, "Anjali Sharma"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(100,116,139)'
    }
  }, "Teacher code 120921004")), /*#__PURE__*/React.createElement("button", {
    onClick: () => go('signin'),
    title: "Profile",
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: '#fff',
      border: 0,
      boxShadow: 'inset 0 0 0 1px rgb(255,121,0)',
      display: 'grid',
      placeItems: 'center',
      color: 'rgb(229,111,61)',
      cursor: 'pointer'
    }
  }, Icon && /*#__PURE__*/React.createElement(Icon, {
    name: "User01",
    size: 24
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      background: `url(${kitAsset('patterns/doodle-bg.png')}) 0 0 / 43.689% auto no-repeat`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 18,
      background: '#fff',
      border: '1px solid rgb(229,230,225)',
      padding: 16,
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `600 14px/20px ${P}`,
      color: 'rgb(32,35,31)',
      padding: '2px 0'
    }
  }, "Evaluate Group Project for 9 A"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: `400 13px/20px ${P}`,
      color: 'rgb(109,114,107)',
      padding: '2px 0'
    }
  }, "Help students reflect on who they are and where they want to grow.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => go('class'),
    style: {
      height: 36,
      borderRadius: 4,
      border: 0,
      background: 'rgb(234,88,12)',
      color: 'rgb(255,247,237)',
      font: '500 14px/20px Inter, sans-serif',
      padding: '0 12px',
      cursor: 'pointer',
      boxShadow: 'inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.3)'
    }
  }, "Yes")), hr, /*#__PURE__*/React.createElement(KitSectionLabel, null, "Quick Actions"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(QuickAction, {
    primary: true,
    title: "Start an Activity",
    sub: "Individual, classroom  or group projects",
    img: "illustrations/start-activity.png",
    onClick: () => go('activity')
  }), /*#__PURE__*/React.createElement(QuickAction, {
    title: "View Student\u2019s HPC",
    sub: "Jump to any student\u2019s profile",
    img: "illustrations/view-hpc.png",
    onClick: () => go('students')
  })), hr, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 18px/24px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, "Your Classes"), /*#__PURE__*/React.createElement("button", {
    style: {
      height: 40,
      borderRadius: 999,
      background: 'rgb(255,242,230)',
      border: '1px solid rgb(181,86,0)',
      padding: '8px 14px',
      display: 'flex',
      gap: 4,
      alignItems: 'center',
      font: `500 12px/22px ${P}`,
      color: 'rgb(181,86,0)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: kitAsset('icons/pencil.svg'),
    alt: "",
    style: {
      width: 13.3,
      height: 13.3,
      margin: 1.35
    }
  }), "Add/Remove Classes")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, CLASSES.map(c => /*#__PURE__*/React.createElement(ClassCard, {
    key: c.grade,
    c: c,
    onClick: () => go('class')
  })))));
}
Object.assign(window, {
  Home,
  CLASSES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher-app/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher-app/Shell.jsx
try { (() => {
// Shared chrome for the HPC Teacher app kit. Uses DS bundle components where the file defines them.
const HPC = window.HPCTeacherAppDesignSystem_97fd44 || {};
const P = 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const kitAsset = p => '../../assets/' + p;
function KitStatusBar({
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 16px',
      boxSizing: 'border-box',
      background: dark ? 'rgb(34,31,38)' : 'rgb(244,242,239)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 14px/20px ${P}`,
      color: dark ? '#fff' : 'rgb(34,31,38)'
    }
  }, "9:30"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      alignItems: 'flex-end',
      height: 11
    }
  }, [4, 6, 8, 11].map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 3,
      height: h,
      borderRadius: 1,
      background: dark ? '#fff' : 'rgb(34,31,38)',
      opacity: i === 3 ? 0.35 : 1
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 11,
      marginLeft: 6,
      borderRadius: 3,
      boxShadow: `inset 0 0 0 1px ${dark ? '#fff' : 'rgb(34,31,38)'}`,
      padding: 2,
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      height: '100%',
      width: '80%',
      borderRadius: 1,
      background: dark ? '#fff' : 'rgb(34,31,38)'
    }
  }))));
}
function KitGesture() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '12px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 999,
      background: 'rgba(63,61,69,0.7)'
    }
  }));
}
function KitAppBar({
  title,
  onBack,
  right
}) {
  const {
    Icon
  } = HPC;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 68,
      flexShrink: 0,
      background: 'rgb(255,251,249)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 16px 0 8px',
      borderBottom: '1px solid rgb(241,239,236)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      width: 44,
      height: 44,
      borderRadius: 8,
      border: 0,
      background: 'transparent',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      color: '#000'
    }
  }, Icon ? /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowLeft",
    size: 20
  }) : '‹'), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: `600 18px/24px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, title), right);
}
function KitPrimaryButton({
  children,
  disabled,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    disabled: disabled,
    onClick: onClick,
    style: {
      width: '100%',
      height: 48,
      minHeight: 48,
      borderRadius: 999,
      cursor: disabled ? 'default' : 'pointer',
      background: disabled ? 'rgb(205,205,205)' : 'rgb(255,121,0)',
      border: `1px solid ${disabled ? 'rgb(241,239,236)' : 'rgb(255,121,0)'}`,
      font: `500 15px/22px ${P}`,
      color: disabled ? 'rgb(167,164,172)' : '#fff'
    }
  }, children);
}
function KitFooter({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px 12px',
      flexShrink: 0
    }
  }, children, /*#__PURE__*/React.createElement(KitGesture, null));
}
function KitSectionLabel({
  children,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: `700 12px/16px ${P}`,
      letterSpacing: '0.96px',
      textTransform: 'uppercase',
      color: color || 'rgb(232,110,0)'
    }
  }, children);
}
function KitOption({
  title,
  sub,
  selected,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      textAlign: 'left',
      width: '100%',
      borderRadius: 10,
      background: selected ? 'rgb(255,250,245)' : '#fff',
      border: `1px solid ${selected ? 'rgb(232,110,0)' : 'rgb(228,225,221)'}`,
      padding: 16,
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `700 15px/22px ${P}`,
      color: selected ? 'rgb(232,110,0)' : 'rgb(34,31,38)'
    }
  }, title), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(107,104,115)',
      padding: '4px 0'
    }
  }, sub));
}
Object.assign(window, {
  HPC,
  P,
  kitAsset,
  KitStatusBar,
  KitGesture,
  KitAppBar,
  KitPrimaryButton,
  KitFooter,
  KitSectionLabel,
  KitOption
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher-app/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher-app/SignIn.jsx
try { (() => {
// Core · 01 · Sign in — language → user type → teacher ID → verify details
function SignIn({
  onDone
}) {
  const [step, setStep] = React.useState(0);
  const [lang, setLang] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [tid, setTid] = React.useState('');
  const {
    InfoField,
    Icon
  } = HPC;
  const title = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `600 24px/30px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, "Let's get Started"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(107,104,115)',
      padding: '4px 0'
    }
  }, ['Please select your desired Language', 'Please select your user type', 'Please select your user type', 'Please verify if this you'][step]));
  const fieldLbl = t => /*#__PURE__*/React.createElement("div", {
    style: {
      font: `700 15px/22px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, t);
  const box = active => ({
    height: 50,
    borderRadius: 8,
    background: '#fff',
    border: `1px solid ${active ? 'rgb(232,110,0)' : 'rgb(228,225,221)'}`,
    padding: '0 15px',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    cursor: 'pointer'
  });
  const details = [['Teacher Name', 'Anjali Sharma'], ['Teacher ID', '123456789'], ['School Name', 'VARANA PRIMARY SCHOOL'], ['School ID', '123456789'], ['Block', 'Dholka'], ['District', 'Dharamshala']];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KitAppBar, {
    title: "Holistic Progress Card",
    onBack: () => setStep(Math.max(0, step - 1))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      background: `url(${kitAsset('patterns/doodle-bg.png')}) 0 0 / 180px auto no-repeat`
    }
  }, title, step === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, fieldLbl('Select Language'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '8px 0'
    }
  }, ['English', 'हिंदी'].map(l => /*#__PURE__*/React.createElement("div", {
    key: l,
    onClick: () => setLang(l),
    style: box(lang === l)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `${lang === l ? 700 : 500} 16px/24px ${P}`,
      color: lang === l ? 'rgb(232,110,0)' : 'rgb(107,104,115)'
    }
  }, l))))), (step === 1 || step === 2) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, fieldLbl('User Type'), /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpen(!open),
    style: {
      ...box(open),
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 14px/20px ${P}`,
      color: type ? 'rgb(34,31,38)' : 'rgb(107,104,115)'
    }
  }, type || 'Select User Type'), Icon && /*#__PURE__*/React.createElement(Icon, {
    name: "ChevronDown",
    size: 16
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 8,
      border: '1px solid rgb(228,225,221)',
      overflow: 'hidden'
    }
  }, ['Teacher', 'Student'].map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    onClick: () => {
      setType(t);
      setOpen(false);
      setStep(2);
    },
    style: {
      padding: '12px 15px',
      font: `500 14px/20px ${P}`,
      color: 'rgb(34,31,38)',
      borderBottom: '1px solid rgb(241,239,236)',
      cursor: 'pointer'
    }
  }, t))), step === 2 && type && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 12
    }
  }, fieldLbl('Teacher ID'), /*#__PURE__*/React.createElement("input", {
    value: tid,
    onChange: e => setTid(e.target.value),
    placeholder: "Enter Teacher ID",
    style: {
      ...box(!!tid),
      font: `400 14px/20px ${P}`,
      outline: 'none',
      cursor: 'text'
    }
  }))), step === 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 8,
      background: 'rgb(245,245,245)',
      padding: '12px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, Icon && /*#__PURE__*/React.createElement(Icon, {
    name: "User01",
    size: 24
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `700 18px/28px ${P}`,
      color: 'rgb(26,28,30)'
    }
  }, "Teacher Details")), details.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(100,116,139)'
    }
  }, k), InfoField ? /*#__PURE__*/React.createElement(InfoField, {
    text1: v
  }) : /*#__PURE__*/React.createElement("span", null, v))))), /*#__PURE__*/React.createElement(KitFooter, null, step === 3 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(2),
    style: {
      border: 0,
      background: 'none',
      font: `500 16px/24px ${P}`,
      color: 'rgb(63,61,69)',
      cursor: 'pointer',
      padding: '0 12px'
    }
  }, "Not me"), /*#__PURE__*/React.createElement("button", {
    onClick: onDone,
    style: {
      flex: 1,
      height: 44,
      borderRadius: 21,
      border: 0,
      background: 'rgb(255,121,0)',
      boxShadow: 'inset -2px -2px 2px 0px rgba(15,23,42,0.14), inset 2px 2px 2px 1px rgba(255,255,255,0.9)',
      font: `500 16px/24px ${P}`,
      color: '#fff',
      cursor: 'pointer'
    }
  }, "Confirm and Proceed")) : /*#__PURE__*/React.createElement(KitPrimaryButton, {
    disabled: step === 0 ? !lang : step === 1 ? !type : !tid,
    onClick: () => setStep(step + 1)
  }, step === 2 ? 'Next' : 'Continue')));
}
window.SignIn = SignIn;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher-app/SignIn.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher-app/Students.jsx
try { (() => {
// View Student's HPC — search list + Live HPC profile
const STUDENTS = [['Om Kumar', 'Class 9 A · Roll No. : 123345'], ['Aarti Mehta', 'Class 9 A · 123401'], ['Krishna Verma', 'Class 10 A · 123512'], ['Aayushi Thakur', 'Class 11 B · 123877']];
function StudentSearch({
  back,
  go
}) {
  const [q, setQ] = React.useState('');
  const {
    Icon
  } = HPC;
  const list = STUDENTS.filter(s => s[0].toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KitAppBar, {
    title: "View Student\u2019s HPC",
    onBack: back
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search Students by Name or ID",
    style: {
      height: 50,
      borderRadius: 8,
      border: `1px solid ${q ? 'rgb(232,110,0)' : 'rgb(228,225,221)'}`,
      padding: '0 15px',
      font: `400 14px/20px ${P}`,
      outline: 'none',
      background: '#fff'
    }
  }), list.map(([n, m]) => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => go('profile'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 16,
      borderRadius: 16,
      background: '#fff',
      border: '1px solid rgb(229,230,225)',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 14px/20px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(107,104,115)'
    }
  }, m)), Icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgb(63,61,69)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowRight",
    size: 18
  })))), !list.length && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      padding: '40px 0',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 14px/20px ${P}`,
      color: 'rgb(181,74,69)'
    }
  }, "Error"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(107,104,115)'
    }
  }, "We couldn't find this student in your selected classes"))));
}
function Glance({
  v,
  l,
  wide
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: wide ? '1 / 3' : 'auto',
      borderRadius: 10,
      background: '#fff',
      border: '1px solid rgb(228,225,221)',
      padding: '12px 14px',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 15px/22px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(107,104,115)'
    }
  }, l));
}
function Timeline({
  date,
  title,
  sub,
  done,
  last
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      marginTop: 6,
      borderRadius: 9999,
      background: done ? 'rgb(63,61,69)' : 'rgb(241,239,236)',
      border: done ? 0 : '1px solid rgb(228,225,221)',
      boxSizing: 'border-box'
    }
  }), !last && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: 1,
      background: 'rgb(228,225,221)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 16,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `700 12px/16px ${P}`,
      letterSpacing: '0.96px',
      textTransform: 'uppercase',
      color: 'rgb(107,104,115)'
    }
  }, date), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `700 15px/22px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 13px/19px ${P}`,
      color: 'rgb(107,104,115)'
    }
  }, sub)));
}
function StudentProfile({
  back
}) {
  const {
    Icon,
    ChartAccordion,
    HealthAccordion,
    ListAccordion,
    PendingAccordion
  } = HPC;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 260,
      flexShrink: 0,
      background: 'rgb(34,31,38)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: 96,
      height: 260,
      background: 'rgb(244,121,31)',
      opacity: 0.92,
      clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      top: 12,
      right: 16,
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: back,
    style: {
      width: 32,
      height: 32,
      marginLeft: -4,
      border: 0,
      background: 'none',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer'
    }
  }, Icon && /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowLeft",
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 18px/24px ${P}`,
      color: '#fff'
    }
  }, "Live HPC")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 68,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 9999,
      background: '#fff',
      display: 'grid',
      placeItems: 'center',
      font: `600 22px/28px ${P}`,
      color: 'rgb(34,31,38)'
    }
  }, "AM"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 12,
      font: `600 18px/24px ${P}`,
      color: '#fff'
    }
  }, "Aarti Mehta"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 4,
      font: `400 13px/19px ${P}`,
      color: 'rgb(228,225,221)'
    }
  }, "Class 9 A \xB7 123401"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 12,
      borderRadius: 999,
      border: '1px solid rgba(255,255,255,0.5)',
      padding: '6px 12px',
      font: `400 13px/19px ${P}`,
      color: '#fff'
    }
  }, "Student Profile"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(KitSectionLabel, null, "This year at a glance"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Glance, {
    v: "3 of 5",
    l: "activities completed"
  }), /*#__PURE__*/React.createElement(Glance, {
    v: "21 h",
    l: "time logged"
  }), /*#__PURE__*/React.createElement(Glance, {
    v: "4 of 6",
    l: "Section A done"
  }), /*#__PURE__*/React.createElement(Glance, {
    v: "2 of 3",
    l: "projects completed"
  }), /*#__PURE__*/React.createElement(Glance, {
    v: "2",
    l: "online course",
    wide: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement(KitSectionLabel, null, "Timeline")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Timeline, {
    done: true,
    date: "20 Oct",
    title: "Water in my village completed",
    sub: "Group Project \xB7 3 stages \xB7 12 h"
  }), /*#__PURE__*/React.createElement(Timeline, {
    done: true,
    date: "12 Sept",
    title: "Plastic ban debate",
    sub: "Classroom activity \xB7 evaluated"
  }), /*#__PURE__*/React.createElement(Timeline, {
    date: "10 Sept",
    title: "Time Management reflection",
    sub: "A3 \xB7 not scored"
  }), /*#__PURE__*/React.createElement(Timeline, {
    last: true,
    date: "3 Sept",
    title: "Started Environmental Sustainability",
    sub: "Online course \xB7 7/20 h"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement(KitSectionLabel, null, "Over the years \xB7 reporting layer")), ListAccordion && /*#__PURE__*/React.createElement(ListAccordion, {
    style: {
      width: '100%'
    }
  }), ChartAccordion && /*#__PURE__*/React.createElement(ChartAccordion, {
    property1: "fa expanded",
    style: {
      width: '100%'
    }
  }), HealthAccordion && /*#__PURE__*/React.createElement(HealthAccordion, {
    property1: "colapsed",
    style: {
      width: '100%'
    }
  }), PendingAccordion && /*#__PURE__*/React.createElement(PendingAccordion, {
    style: {
      width: '100%'
    }
  })));
}
Object.assign(window, {
  StudentSearch,
  StudentProfile
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher-app/Students.jsx", error: String((e && e.message) || e) }); }

if (__ds_scope.__ds_default_components_icons_icon_data_12stud1$1nb03e1 === undefined) __ds_scope.__ds_default_components_icons_icon_data_12stud1$1nb03e1 = __ds_scope.__ds_default_components_icons_icon_data_12stud1;

__ds_ns.ChartAccordion = __ds_scope.ChartAccordion;

__ds_ns.HealthAccordion = __ds_scope.HealthAccordion;

__ds_ns.InfoAccordion = __ds_scope.InfoAccordion;

__ds_ns.ListAccordion = __ds_scope.ListAccordion;

__ds_ns.PendingAccordion = __ds_scope.PendingAccordion;

__ds_ns.BottomNavBar = __ds_scope.BottomNavBar;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Button2 = __ds_scope.Button2;

__ds_ns.CaretRight = __ds_scope.CaretRight;

__ds_ns.NavButton = __ds_scope.NavButton;

__ds_ns.Notes = __ds_scope.Notes;

__ds_ns.BGFrame = __ds_scope.BGFrame;

__ds_ns.GestureBar = __ds_scope.GestureBar;

__ds_ns.StatusBar = __ds_scope.StatusBar;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.BadgeAccentTag = __ds_scope.BadgeAccentTag;

__ds_ns.Separator = __ds_scope.Separator;

__ds_ns.SpeedWidgets = __ds_scope.SpeedWidgets;

__ds_ns.StudentOverviewCard = __ds_scope.StudentOverviewCard;

__ds_ns.WorkoutTime = __ds_scope.WorkoutTime;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.InfoField = __ds_scope.InfoField;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.RadioButton = __ds_scope.RadioButton;

__ds_ns.RadioButtonIcon = __ds_scope.RadioButtonIcon;

__ds_ns.BarChart07 = __ds_scope.BarChart07;

__ds_ns.Briefcase02 = __ds_scope.Briefcase02;

__ds_ns.ChevronDown = __ds_scope.ChevronDown;

__ds_ns.ChevronDownFilled = __ds_scope.ChevronDownFilled;

__ds_ns.ChevronUp = __ds_scope.ChevronUp;

__ds_ns.Circle = __ds_scope.Circle;

__ds_ns.Circle2 = __ds_scope.Circle2;

__ds_ns.HelpCircle = __ds_scope.HelpCircle;

__ds_ns.HxHome02 = __ds_scope.HxHome02;

__ds_ns.HxTrendUp01Filled = __ds_scope.HxTrendUp01Filled;

__ds_ns.IconCheck = __ds_scope.IconCheck;

__ds_ns.Mail01 = __ds_scope.Mail01;

__ds_ns.Minus = __ds_scope.Minus;

__ds_ns.Icon = __ds_scope.Icon;

})();
