import { useRef, useState, useCallback } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useProductCategoryRdos } from '~/hooks';
import { ProductCategoryRdo } from '@beribturing/api-stub';

export interface ProductCategory {
  id: string;
  name: string;
  iconUrl?: string;
}

interface CatalogMenuProps {
  onClose: () => void;
  isMobile?: boolean;
}

export function CatalogMenu({ onClose, isMobile = false }: CatalogMenuProps) {
  const { productCategories } = useProductCategoryRdos({});
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggle = (id: string) =>
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleSelect = useCallback(
    (id: string) => {
      console.log('Navigate to:', id);
      onClose();
    },
    [onClose],
  );

  const handleMouseEnter = (id: string, hasChildren: boolean) => {
    if (!hasChildren) {
      setHoveredId(null);
      return;
    }
    setHoveredId(id);
    const rect = refs.current[id]?.getBoundingClientRect();
    if (rect) {
      setSubmenuPosition({ top: rect.top, left: rect.right }); // tighter spacing
    }
  };

  // ✅ Utility: filter invalid nodes
  const cleanNodes = (nodes?: ProductCategoryRdo[]) => nodes?.filter((n) => !!n?.category?.name) ?? [];

  const Node = ({ node, level = 0, mobile }: { node: ProductCategoryRdo; level?: number; mobile?: boolean }) => {
    const { category, subCategories } = node;
    const validSubs = cleanNodes(subCategories);
    const isExpanded = expandedIds.includes(category.id);
    const hasChildren = validSubs.length > 0;

    const clickHandler = () => (mobile && hasChildren ? toggle(category.id) : handleSelect(category.id));

    return (
      <div
        className={mobile ? 'space-y-2' : 'relative'}
        ref={(el) => (refs.current[category.id] = el)}
        onMouseEnter={!mobile ? () => handleMouseEnter(category.id, hasChildren) : undefined}
        onMouseLeave={!mobile ? () => setHoveredId(null) : undefined}
      >
        <button
          onClick={clickHandler}
          className={`flex items-center justify-between w-full text-left ${
            mobile ? 'py-2' : 'px-3 py-2 rounded-lg hover:bg-gray-50'
          } transition-colors`}
        >
          <div className="flex items-center space-x-2">
            {category.iconUrl && <img src={category.iconUrl} alt="" className="w-4 h-4" />}
            <span className={`font-medium ${mobile ? '' : 'text-sm'}`}>{category.name}</span>
          </div>
          {hasChildren &&
            (mobile ? (
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            ))}
        </button>

        {mobile && isExpanded && hasChildren && (
          <div className="ml-6 space-y-2">
            {validSubs.map((child) => (
              <Node key={child.category.id} node={child} level={level + 1} mobile />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isMobile ? (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 mb-3">Browse Categories</h3>
          {cleanNodes(productCategories).map((c) => (
            <Node key={c.category.id} node={c} mobile />
          ))}
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl w-64">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Browse Categories</h3>
              <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                {cleanNodes(productCategories).map((c) => (
                  <Node key={c.category.id} node={c} />
                ))}
              </div>
            </div>
          </div>

          {hoveredId &&
            cleanNodes(productCategories.find((c) => c.category.id === hoveredId)?.subCategories).length > 0 && (
              <div
                className="fixed bg-white border border-gray-200 rounded-lg shadow-xl z-[70] w-72"
                style={{
                  top: submenuPosition.top,
                  left: submenuPosition.left,
                  maxHeight: '60vh',
                  overflowY: 'auto',
                }}
                onMouseEnter={() => setHoveredId(hoveredId)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="p-4 space-y-4">
                  {cleanNodes(productCategories.find((c) => c.category.id === hoveredId)?.subCategories).map((sub) => (
                    <div key={sub.category.id} className="space-y-2">
                      <button
                        onClick={() => handleSelect(sub.category.id)}
                        className="font-medium text-gray-900 hover:text-purple-600 transition-colors text-sm block w-full text-left"
                      >
                        {sub.category.name}
                      </button>
                      {cleanNodes(sub.subCategories).length > 0 && (
                        <div className="space-y-1 ml-2">
                          {cleanNodes(sub.subCategories).map((s) => (
                            <button
                              key={s.category.id}
                              onClick={() => handleSelect(s.category.id)}
                              className="text-xs text-gray-600 hover:text-purple-600 transition-colors py-1 block w-full text-left"
                            >
                              {s.category.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
        </>
      )}
    </>
  );
}
