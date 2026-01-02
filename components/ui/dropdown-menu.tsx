'use client';

import * as React from 'react';

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentAlign: 'start' | 'end' | 'center';
  setContentAlign: (align: 'start' | 'end' | 'center') => void;
};

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenu components must be used within <DropdownMenu>.');
  return ctx;
}

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [contentAlign, setContentAlign] = React.useState<'start' | 'end' | 'center'>('start');

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, contentAlign, setContentAlign }}>
      <div className="relative inline-flex">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

type DropdownMenuTriggerProps = {
  asChild?: boolean;
  children: React.ReactNode;
};

export function DropdownMenuTrigger({ asChild, children }: DropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdownMenuContext();

  const onClick: React.MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  const child = React.Children.only(children);

  if (asChild && React.isValidElement(child)) {
    type ChildProps = React.HTMLAttributes<HTMLElement>;
    const childEl = child as React.ReactElement<ChildProps>;
    const childOnClick = childEl.props.onClick as React.MouseEventHandler<HTMLElement> | undefined;

    return React.cloneElement(childEl, {
      onClick: chainHandlers(childOnClick, onClick),
      'aria-haspopup': 'menu',
      'aria-expanded': open,
    });
  }

  return (
    <button type="button" onClick={onClick} aria-haspopup="menu" aria-expanded={open}>
      {children}
    </button>
  );
}

type DropdownMenuContentProps = {
  align?: 'start' | 'end' | 'center';
  className?: string;
  children: React.ReactNode;
};

export function DropdownMenuContent({ align = 'start', className, children }: DropdownMenuContentProps) {
  const { open, setOpen, contentAlign, setContentAlign } = useDropdownMenuContext();
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setContentAlign(align);
  }, [align, setContentAlign]);

  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (!contentRef.current) return;

      const root = contentRef.current.parentElement;
      if (root && root.contains(target)) return;

      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, setOpen]);

  if (!open) return null;

  const alignClass =
    contentAlign === 'end'
      ? 'right-0'
      : contentAlign === 'center'
        ? 'left-1/2 -translate-x-1/2'
        : 'left-0';

  return (
    <div
      ref={contentRef}
      role="menu"
      className={[
        'absolute top-full z-[9999] mt-2 min-w-[14rem] overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]',
        alignClass,
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={["px-[12px] py-[8px] text-[14px] text-[#111827]", className ?? ''].join(' ')}>{children}</div>;
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={["my-[4px] h-px bg-[#E5E7EB]", className ?? ''].join(' ')} />;
}

type DropdownMenuItemProps = {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
  variant?: 'default' | 'destructive';
};

export function DropdownMenuItem({ children, className, onSelect, variant = 'default' }: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenuContext();

  const base =
    'w-full flex items-center gap-[8px] rounded-[10px] px-[12px] py-[8px] text-[14px] text-left transition-colors';
  const colors =
    variant === 'destructive'
      ? 'text-[#EF4444] hover:bg-[#FEF2F2]'
      : 'text-[#111827] hover:bg-[#F3F4F6]';

  return (
    <button
      type="button"
      role="menuitem"
      onClick={() => {
        onSelect?.();
        setOpen(false);
      }}
      className={[base, colors, className ?? ''].join(' ')}
    >
      {children}
    </button>
  );
}

function chainHandlers<TEvent>(
  original: ((event: TEvent) => void) | undefined,
  next: (event: TEvent) => void
) {
  return (event: TEvent) => {
    original?.(event);
    next(event);
  };
}
