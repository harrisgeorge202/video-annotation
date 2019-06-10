import React, { Component } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import compose from '../utils/compose';
import isMouseHovering from '../utils/isMouseHovering';
import withRelativeMousePos from '../utils/withRelativeMousePos';

import defaultProps from './defaultProps';
import Overlay from './Overlay';
import { Avatar } from "antd";

var _class, _temp2;

var _templateObject = _taggedTemplateLiteralLoose(['\n  clear: both;\n  position: relative;\n  width: 100%;\n  &:hover ', ' {\n    opacity: 1;\n  }\n'], ['\n  clear: both;\n  position: relative;\n  width: 100%;\n  &:hover ', ' {\n    opacity: 1;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: block;\n  width: 100%;\n'], ['\n  display: block;\n  width: 100%;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n'], ['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }


var Container = styled.div(_templateObject, Overlay);

var Img = styled.img(_templateObject2);

var Items = styled.div(_templateObject3);

var Target = Items;

export default compose(isMouseHovering(), withRelativeMousePos())((_temp2 = _class = function (_Component) {
  _inherits(Annotation, _Component);

  function Annotation() {
    var _temp, _this, _ret;

    _classCallCheck(this, Annotation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.setInnerRef = function (el) {
      _this.container = el;
      _this.props.relativeMousePos.innerRef(el);
      _this.props.innerRef(el);
    }, _this.getSelectorByType = function (type) {
      return _this.props.selectors.find(function (s) {
        return s.TYPE === type;
      });
    }, _this.getTopAnnotationAt = function (x, y) {
      var annotations = _this.props.annotations;
      var _this2 = _this,
          container = _this2.container,
          getSelectorByType = _this2.getSelectorByType;


      if (!container) return;

      var intersections = annotations.map(function (annotation) {
        var geometry = annotation.geometry;

        var selector = getSelectorByType(geometry.type);

        return selector.intersects({ x: x, y: y }, geometry, container) ? annotation : false;
      }).filter(function (a) {
        return !!a;
      }).sort(function (a, b) {
        var aSelector = getSelectorByType(a.geometry.type);
        var bSelector = getSelectorByType(b.geometry.type);

        return aSelector.area(a.geometry, container) - bSelector.area(b.geometry, container);
      });

      return intersections[0];
    }, _this.onTargetMouseMove = function (e) {
      _this.props.relativeMousePos.onMouseMove(e);
      _this.onMouseMove(e);
    }, _this.onTargetMouseLeave = function (e) {
      _this.props.relativeMousePos.onMouseLeave(e);
    }, _this.onMouseUp = function (e) {
      return _this.callSelectorMethod('onMouseUp', e);
    }, _this.onMouseDown = function (e) {
      return _this.callSelectorMethod('onMouseDown', e);
    }, _this.onMouseMove = function (e) {
      return _this.callSelectorMethod('onMouseMove', e);
    }, _this.onClick = function (e) {
      return _this.callSelectorMethod('onClick', e);
    }, _this.onSubmit = function () {
      _this.props.onSubmit(_this.props.value);
    }, _this.callSelectorMethod = function (methodName, e) {
      if (_this.props.disableAnnotation) {
        return;
      }

      if (!!_this.props[methodName]) {
        _this.props[methodName](e);
      } else {
        var selector = _this.getSelectorByType(_this.props.type);
        if (selector && selector.methods[methodName]) {
          var value = selector.methods[methodName](_this.props.value, e);

          if (typeof value === 'undefined') {
            if (process.env.NODE_ENV !== 'production') {
              console.error('\n              ' + methodName + ' of selector type ' + _this.props.type + ' returned undefined.\n              Make sure to explicitly return the previous state\n            ');
            }
          } else {
            _this.props.onChange(value);
          }
        }
      }
    }, _this.shouldAnnotationBeActive = function (annotation, top) {
      if (_this.props.activeAnnotations) {
        var isActive = !!_this.props.activeAnnotations.find(function (active) {
          return _this.props.activeAnnotationComparator(annotation, active);
        });

        return isActive || top === annotation;
      } else {
        return top === annotation;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Annotation.prototype.render = function render() {
    var _this3 = this;

    var props = this.props;
    var isMouseHovering = props.isMouseHovering,
        renderHighlight = props.renderHighlight,
        renderContent = props.renderContent,
        renderSelector = props.renderSelector,
        renderEditor = props.renderEditor,
        renderOverlay = props.renderOverlay;


    var topAnnotationAtMouse = this.getTopAnnotationAt(this.props.relativeMousePos.x, this.props.relativeMousePos.y);

    return React.createElement(
      Container,
      {
        style: props.style,
        innerRef: isMouseHovering.innerRef,
        onMouseLeave: this.onTargetMouseLeave
      },
      React.createElement(Img, {
        className: props.className,
        style: props.style,
        alt: props.alt,
        src: props.src,
        draggable: false,
        innerRef: this.setInnerRef
      }),
      React.createElement(
        Items,
        null,
        props.annotations.map(function (annotation) {
          return renderHighlight({
            key: annotation.data.id,
            annotation: annotation,
            active: _this3.shouldAnnotationBeActive(annotation, topAnnotationAtMouse)
          });
        }),
        !props.disableSelector && props.value && props.value.geometry && renderSelector({
          annotation: props.value
        })
      ),
      React.createElement(Target, {
        onClick: this.onClick,
        onMouseUp: this.onMouseUp,
        onMouseDown: this.onMouseDown,
        onMouseMove: this.onTargetMouseMove
      }),
      !props.disableOverlay && renderOverlay({
        type: props.type,
        annotation: props.value
      }),
      props.annotations.map(function (annotation) {
        return _this3.shouldAnnotationBeActive(annotation, topAnnotationAtMouse) && renderContent({
          key: annotation.data.id,
          annotation: annotation
        });
      }),
      !props.disableEditor && props.value && props.value.selection && props.value.selection.showEditor && renderEditor({
        annotation: props.value,
        timecode: props.timecode,
        profile_pic: props.profile_pic,
        onChange: props.onChange,
        onSubmit: this.onSubmit
      }),
      React.createElement(
        'div',
        null,
        props.children
      )
    );
  };

  return Annotation;
}(Component), _class.propTypes = {
  innerRef: T.func,
  onMouseUp: T.func,
  onMouseDown: T.func,
  onMouseMove: T.func,
  onClick: T.func,
  children: T.object,

  annotations: T.arrayOf(T.shape({
    type: T.string
  })).isRequired,
  type: T.string,
  selectors: T.arrayOf(T.shape({
    TYPE: T.string,
    intersects: T.func.isRequired,
    area: T.func.isRequired,
    methods: T.object.isRequired
  })).isRequired,

  value: T.shape({
    selection: T.object,
    geometry: T.shape({
      type: T.string.isRequired
    }),
    data: T.object
  }),
  onChange: T.func,
  onSubmit: T.func,

  activeAnnotationComparator: T.func,
  activeAnnotations: T.arrayOf(T.any),

  disableAnnotation: T.bool,
  disableSelector: T.bool,
  renderSelector: T.func,
  disableEditor: T.bool,
  renderEditor: T.func,

  renderHighlight: T.func.isRequired,
  renderContent: T.func.isRequired,

  disableOverlay: T.bool,
  renderOverlay: T.func.isRequired
}, _class.defaultProps = defaultProps, _temp2));
