import {
  Engine, Render, Bodies, Composite, Runner, MouseConstraint, Mouse, Events, Query, Body,
} from 'matter-js';
import { useEffect, useRef } from 'react';
import htmlLogo from '../../assets/img/logo-html.png';
import cssLogo from '../../assets/img/logo-css.png';
import jsLogo from '../../assets/img/logo-js.png';
import reactLogo from '../../assets/img/logo-react.png';

export default function Scene() {
  const scene = useRef();
  const engine = useRef(Engine.create());
  useEffect(() => {
    const cw = scene.current.offsetWidth;
    const ch = scene.current.parentNode.offsetHeight;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
      },
    });

    const ground = Bodies.rectangle(cw / 2, ch, cw, 3, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    });

    const world = Composite;

    world.add(engine.current.world, [
      ground,
    ]);

    Runner.run(engine.current);
    Render.run(render);

    const mouse = Mouse.create(scene.current.parentNode);

    const constraint = MouseConstraint.create(engine.current, {
      mouse,
    });
    world.add(engine.current.world, [
      constraint,
    ]);

    const bodies = [];

    const addBody = (image) => {
      const body = Bodies.rectangle(Math.random() * cw, 0, 49, 70, {
        friction: 0.01,
        density: 0.0001,
        angle: Math.random() * 3,
        restitution: 0.8,
        frictionAir: 0.2,
        render: {
          sprite: {
            texture: image.src,
          },
        },
      });
      bodies.push(body);
      world.add(engine.current.world, [
        body,
      ]);
    };

    for (let i = 1; i < 15; i += 1) {
      if (i % 4 === 0) {
        setTimeout(() => addBody(reactLogo), 2000 * i);
      } else if (i % 3 === 0) {
        setTimeout(() => addBody(jsLogo), 2000 * i);
      } else if (i % 2 === 0) {
        setTimeout(() => addBody(cssLogo), 2000 * i);
      } else {
        setTimeout(() => addBody(htmlLogo), 2000 * i);
      }
    }

    let oldX = 0;
    let oldY = 0;
    Events.on(constraint, 'mousemove', (event) => {
      const collisionBody = Query.point(bodies, event.mouse.position);
      if (collisionBody.length > 0) {
        const force = {
          x: (event.mouse.position.x - oldX) / 600,
          y: (event.mouse.position.y - oldY) / 600,
        };
        Body.applyForce(
          collisionBody[0],
          {
            x: collisionBody[0].position.x,
            y: collisionBody[0].position.y,
          },
          force,
        );
      }
      oldX = event.mouse.position.x;
      oldY = event.mouse.position.y;
    });

    return () => {
      Render.stop(render);
      world.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: '0',
      }}
      ref={scene}
    />
  );
}
