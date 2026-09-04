'use client';

import { PredictiveArcCanvas } from '@designcodeio/threeui';

/**
 * Client wrapper for ThreeUI's PredictiveArcCanvas.
 *
 * The published package ships no "use client" directives, and the component
 * renders to a WebGL canvas via lazy/Suspense — so it can only be imported
 * from a client boundary. Import this instead of the package directly.
 */
export default function PredictiveArc(props) {
  return <PredictiveArcCanvas {...props} />;
}
