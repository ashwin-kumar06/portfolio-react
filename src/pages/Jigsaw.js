import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FaArrowLeft, FaHome, FaPuzzlePiece, FaUndo, FaWindowMinimize, FaRegWindowMaximize, FaWindowClose } from 'react-icons/fa';
import photos from '../photosdata';
import { COLORS } from '../constant';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Shrikhand&family=VT323&display=swap');
  
  body {
    font-family: 'VT323', monospace;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${COLORS.lightSage};
    background-image: 
      linear-gradient(rgba(101, 124, 106, 0.4) 1px, transparent 1px),
      linear-gradient(90deg, rgba(101, 124, 106, 0.4) 1px, transparent 1px);
    background-size: 50px 50px;
    color: #000;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${COLORS.goldenYellow};
  border-bottom: 4px solid #000;
  box-shadow: 0px 6px 0px #000;
  z-index: 10;
`;

const HeaderTitle = styled.h1`
  font-family: 'Shrikhand', cursive;
  font-size: 2rem;
  color: #000;
  margin: 0;
  text-transform: uppercase;
  text-shadow: 2px 2px 0px #fff;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const HeaderBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: ${props => props.$primary ? COLORS.burntOrange : '#fff'};
  color: ${props => props.$primary ? '#fff' : '#000'};
  text-decoration: none;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  transition: all 0.1s ease;
  cursor: pointer;

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
  
  &:hover {
    background: #000;
    color: #fff;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
`;

// Difficulty Phase
const RetroWindow = styled.div`
  background: #fff;
  border: 3px solid #000;
  box-shadow: 10px 10px 0px #000;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const WindowHeader = styled.div`
  background: ${COLORS.sageGreen};
  border-bottom: 3px solid #000;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
`;

const WindowIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  
  svg {
    background: ${COLORS.lightSage};
    color: #000;
    border: 1px solid #000;
    padding: 2px;
    cursor: pointer;
  }
`;

const WindowContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
`;

const Title = styled.h2`
  font-family: 'Press Start 2P', monospace;
  font-size: 1.5rem;
  margin: 0;
  color: ${COLORS.burntOrange};
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin: 0;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-width: 300px;
  border: 3px solid #000;
  box-shadow: 6px 6px 0px #000;
`;

const DiffButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const DiffButton = styled.button`
  background: ${COLORS.goldenYellow};
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  padding: 1rem;
  font-family: 'VT323', monospace;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.1s;
  
  &:hover {
    background: ${COLORS.burntOrange};
    color: #fff;
  }
  
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
`;

// Playing Phase
const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 1rem;
  background: #fff;
  border: 3px solid #000;
  padding: 0.5rem 1rem;
  box-shadow: 4px 4px 0px #000;
`;

const GameInfo = styled.div`
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
`;

const ActionButton = styled.button`
  background: ${props => props.$primary ? COLORS.burntOrange : '#fff'};
  color: ${props => props.$primary ? '#fff' : '#000'};
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  padding: 0.5rem 1rem;
  font-family: 'VT323', monospace;
  font-size: 1.2rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:disabled {
    background: #ccc;
    color: #666;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
  
  &:active:not(:disabled) {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  position: relative;
  width: 100%;
`;

const Board = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.5);
  border: 4px solid #000;
  box-shadow: 8px 8px 0px rgba(0,0,0,0.2);
  touch-action: none;
`;

const Slot = styled.div`
  position: absolute;
  border: 1px dashed rgba(0,0,0,0.2);
  box-sizing: border-box;
`;

const Piece = styled.div`
  position: absolute;
  border: 1px solid rgba(0,0,0,0.5);
  box-sizing: border-box;
  touch-action: none;
  cursor: grab;
  
  &.placed {
    box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  
  &.locked {
    border: none;
    box-shadow: none;
    cursor: default;
    z-index: 1;
  }
  
  &.floating {
    z-index: 999;
    box-shadow: 10px 10px 20px rgba(0,0,0,0.5);
    cursor: grabbing;
    pointer-events: none;
  }
`;

const Tray = styled.div`
  width: 100%;
  max-width: 1000px;
  background: ${COLORS.goldenYellow};
  border: 4px solid #000;
  box-shadow: 8px 8px 0px #000;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const TrayLabel = styled.div`
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const TrayPieces = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  min-height: 100px;
  
  .jigsaw-piece {
    position: relative;
    box-shadow: 2px 2px 0px #000;
    
    &.dragging {
      opacity: 0.3;
    }
  }
`;

const WinOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const DIFFICULTIES = {
  easy: { label: 'Easy', rows: 3, cols: 3, description: '9 pieces' },
  medium: { label: 'Medium', rows: 4, cols: 4, description: '16 pieces' },
  hard: { label: 'Hard', rows: 6, cols: 6, description: '36 pieces' },
};

const allPhotos = Object.values(photos);

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createPieces(rows, cols) {
  const pieces = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      pieces.push({
        id: row * cols + col,
        correctRow: row,
        correctCol: col,
        placedRow: null,
        placedCol: null,
        locked: false,
      });
    }
  }
  return pieces;
}

function isPuzzleComplete(pieces) {
  return pieces.every(
    (p) =>
      p.locked &&
      p.placedRow === p.correctRow &&
      p.placedCol === p.correctCol
  );
}

function clonePieces(pieces) {
  return pieces.map((p) => ({ ...p }));
}

function JigsawBoard({ imageSrc, rows, cols, onCompletionChange }) {
  const boardRef = useRef(null);
  const dragState = useRef(null);
  const trayOrderRef = useRef([]);
  const historyRef = useRef([]);
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pieces, setPieces] = useState(() => createPieces(rows, cols));
  const [canUndo, setCanUndo] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const pieceWidth = boardSize.width / cols;
  const pieceHeight = boardSize.height / rows;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const maxWidth = Math.min(window.innerWidth - 48, 560);
      const maxHeight = Math.min(window.innerHeight - 320, 420);
      const aspect = img.naturalWidth / img.naturalHeight;

      let width = maxWidth;
      let height = width / aspect;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspect;
      }

      setBoardSize({ width, height });
      setImageLoaded(true);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    const initial = createPieces(rows, cols);
    setPieces(initial);
    trayOrderRef.current = shuffleArray(initial.map((p) => p.id));
    historyRef.current = [];
    setCanUndo(false);
  }, [rows, cols, imageSrc]);

  useEffect(() => {
    onCompletionChange(isPuzzleComplete(pieces));
  }, [pieces, onCompletionChange]);

  const applyMove = useCallback((computeNext) => {
    setPieces((prev) => {
      const next = computeNext(prev);
      if (next === prev) return prev;

      historyRef.current.push(clonePieces(prev));
      setCanUndo(true);
      return next;
    });
  }, []);

  const handleUndo = useCallback(() => {
    if (historyRef.current.length === 0) return;

    const previous = historyRef.current.pop();
    setCanUndo(historyRef.current.length > 0);
    setPieces(previous);
    setDraggingId(null);
    dragState.current = null;
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleUndo]);

  const getCellFromPoint = useCallback(
    (clientX, clientY) => {
      const board = boardRef.current;
      if (!board || !pieceWidth || !pieceHeight) return null;

      const rect = board.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return null;

      const col = Math.floor(x / pieceWidth);
      const row = Math.floor(y / pieceHeight);

      if (row >= rows || col >= cols) return null;
      return { row, col };
    },
    [pieceWidth, pieceHeight, rows, cols]
  );

  const tryPlacePiece = useCallback(
    (pieceId, row, col) => {
      applyMove((prev) => {
        const piece = prev.find((p) => p.id === pieceId);
        if (!piece || piece.locked) return prev;

        const occupant = prev.find(
          (p) => p.placedRow === row && p.placedCol === col && p.id !== pieceId
        );

        if (occupant && occupant.locked) return prev;

        let next = prev.map((p) => {
          if (p.id === pieceId) {
            const isCorrect = row === p.correctRow && col === p.correctCol;
            return {
              ...p,
              placedRow: row,
              placedCol: col,
              locked: isCorrect,
            };
          }
          if (occupant && p.id === occupant.id) {
            return {
              ...p,
              placedRow: piece.placedRow,
              placedCol: piece.placedCol,
              locked: false,
            };
          }
          return p;
        });

        next = next.map((p) => {
          if (
            p.placedRow !== null &&
            p.placedCol !== null &&
            p.placedRow === p.correctRow &&
            p.placedCol === p.correctCol
          ) {
            return { ...p, locked: true };
          }
          return p;
        });

        return next;
      });
    },
    [applyMove]
  );

  const returnToTray = useCallback((pieceId) => {
    applyMove((prev) => {
      const piece = prev.find((p) => p.id === pieceId);
      if (!piece || piece.locked || piece.placedRow === null) return prev;

      return prev.map((p) =>
        p.id === pieceId
          ? { ...p, placedRow: null, placedCol: null, locked: false }
          : p
      );
    });
  }, [applyMove]);

  const handlePointerDown = useCallback(
    (e, pieceId) => {
      const piece = pieces.find((p) => p.id === pieceId);
      if (!piece || piece.locked) return;

      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      dragState.current = { pieceId, pointerId: e.pointerId };
      setDraggingId(pieceId);
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setDragPosition({ x: e.clientX, y: e.clientY });
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [pieces]
  );

  const handlePointerMove = useCallback((e) => {
    if (!dragState.current || dragState.current.pointerId !== e.pointerId) return;
    setDragPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePointerUp = useCallback(
    (e) => {
      if (!dragState.current || dragState.current.pointerId !== e.pointerId) return;

      const { pieceId } = dragState.current;
      const cell = getCellFromPoint(e.clientX, e.clientY);

      if (cell) {
        tryPlacePiece(pieceId, cell.row, cell.col);
      } else {
        const tray = document.querySelector('.jigsaw-tray');
        if (tray) {
          const rect = tray.getBoundingClientRect();
          if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            returnToTray(pieceId);
          }
        }
      }

      dragState.current = null;
      setDraggingId(null);
    },
    [getCellFromPoint, tryPlacePiece, returnToTray]
  );

  const trayPieces = useMemo(() => {
    const inTray = pieces.filter((p) => !p.locked && p.placedRow === null);
    const order = trayOrderRef.current;
    const orderIndex = new Map(order.map((id, index) => [id, index]));

    return [...inTray].sort(
      (a, b) => (orderIndex.get(a.id) ?? order.length) - (orderIndex.get(b.id) ?? order.length)
    );
  }, [pieces]);

  const placedPieces = useMemo(
    () => pieces.filter((p) => p.placedRow !== null),
    [pieces]
  );

  const renderPiece = (piece, isDragging = false) => (
    <div
      key={piece.id}
      className={`jigsaw-piece ${isDragging ? 'dragging' : ''}`}
      style={{
        width: pieceWidth,
        height: pieceHeight,
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: `${boardSize.width}px ${boardSize.height}px`,
        backgroundPosition: `-${piece.correctCol * pieceWidth}px -${piece.correctRow * pieceHeight}px`,
      }}
      onPointerDown={(e) => handlePointerDown(e, piece.id)}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="button"
      tabIndex={0}
      aria-label={`Puzzle piece ${piece.id + 1}`}
    />
  );

  if (!imageLoaded) {
    return <div style={{ fontFamily: "'Press Start 2P', monospace", margin: '2rem' }}>LOADING.EXE...</div>;
  }

  const draggingPiece = draggingId !== null ? pieces.find((p) => p.id === draggingId) : null;

  return (
    <GameArea>
      <GameHeader>
        <GameInfo>
          <ActionButton onClick={handleUndo} disabled={!canUndo}>
            <FaUndo /> UNDO
          </ActionButton>
        </GameInfo>
      </GameHeader>

      <Board
        ref={boardRef}
        style={{ width: boardSize.width, height: boardSize.height }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          return (
            <Slot
              key={`slot-${row}-${col}`}
              style={{
                width: pieceWidth,
                height: pieceHeight,
                left: col * pieceWidth,
                top: row * pieceHeight,
              }}
            />
          );
        })}

        {placedPieces.map((piece) => (
          <Piece
            key={`placed-${piece.id}`}
            className={`placed ${piece.locked ? 'locked' : ''}`}
            style={{
              width: pieceWidth,
              height: pieceHeight,
              left: piece.placedCol * pieceWidth,
              top: piece.placedRow * pieceHeight,
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: `${boardSize.width}px ${boardSize.height}px`,
              backgroundPosition: `-${piece.correctCol * pieceWidth}px -${piece.correctRow * pieceHeight}px`,
              opacity: draggingId === piece.id ? 0.3 : 1,
            }}
            onPointerDown={piece.locked ? undefined : (e) => handlePointerDown(e, piece.id)}
            onPointerMove={piece.locked ? undefined : handlePointerMove}
            onPointerUp={piece.locked ? undefined : handlePointerUp}
          />
        ))}
      </Board>

      <Tray className="jigsaw-tray">
        <TrayLabel>DRAG_PIECES_ONTO_BOARD.EXE</TrayLabel>
        <TrayPieces>
          {trayPieces.map((piece) => renderPiece(piece, draggingId === piece.id))}
        </TrayPieces>
      </Tray>

      {draggingPiece && (
        <Piece
          className="floating"
          style={{
            width: pieceWidth,
            height: pieceHeight,
            left: dragPosition.x - dragOffset.x,
            top: dragPosition.y - dragOffset.y,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${boardSize.width}px ${boardSize.height}px`,
            backgroundPosition: `-${draggingPiece.correctCol * pieceWidth}px -${draggingPiece.correctRow * pieceHeight}px`,
          }}
        />
      )}
    </GameArea>
  );
}

export default function Jigsaw() {
  const { photoIndex } = useParams();
  const navigate = useNavigate();
  const index = parseInt(photoIndex, 10);
  const imageSrc = Number.isNaN(index) || index < 0 || index >= allPhotos.length
    ? null
    : allPhotos[index];

  const [phase, setPhase] = useState('difficulty');
  const [difficulty, setDifficulty] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!imageSrc) {
      navigate('/photo', { replace: true });
    }
  }, [imageSrc, navigate]);

  const handleSelectDifficulty = (key) => {
    setDifficulty(key);
    setPhase('playing');
    setCompleted(false);
  };

  const handleCompletionChange = useCallback((isComplete) => {
    setCompleted(isComplete);
  }, []);

  const handlePlayAgain = () => {
    setPhase('difficulty');
    setDifficulty(null);
    setCompleted(false);
  };

  if (!imageSrc) return null;

  const config = difficulty ? DIFFICULTIES[difficulty] : null;

  return (
    <PageContainer>
      <GlobalStyle />
      
      <Header>
        <HeaderTitle>JIGSAW.EXE</HeaderTitle>
        <HeaderActions>
          <HeaderBtn to="/photo">
            <FaArrowLeft size={16} /> GALLERY
          </HeaderBtn>
          <HeaderBtn to="/home" $primary>
            <FaHome size={16} /> HOME
          </HeaderBtn>
        </HeaderActions>
      </Header>

      <ContentArea>
        {phase === 'difficulty' && (
          <RetroWindow>
            <WindowHeader>
              <span>CHOOSE_DIFFICULTY.EXE</span>
              <WindowIcons>
                <FaWindowMinimize />
                <FaRegWindowMaximize />
                <FaWindowClose />
              </WindowIcons>
            </WindowHeader>
            <WindowContent>
              <Title><FaPuzzlePiece /> NEW PUZZLE</Title>
              <PreviewImage src={imageSrc} alt="Puzzle preview" />
              <Subtitle>Select your challenge:</Subtitle>
              <DiffButtonsContainer>
                {Object.entries(DIFFICULTIES).map(([key, { label, description }]) => (
                  <DiffButton key={key} onClick={() => handleSelectDifficulty(key)}>
                    <span>{label}</span>
                    <span style={{ fontSize: '1rem', color: '#555' }}>{description}</span>
                  </DiffButton>
                ))}
              </DiffButtonsContainer>
            </WindowContent>
          </RetroWindow>
        )}

        {phase === 'playing' && config && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <GameHeader>
              <GameInfo>
                MODE: {config.label.toUpperCase()} | {config.description.toUpperCase()}
              </GameInfo>
              <ActionButton onClick={handlePlayAgain}>CHANGE_DIFFICULTY</ActionButton>
            </GameHeader>

            <JigsawBoard
              key={difficulty}
              imageSrc={imageSrc}
              rows={config.rows}
              cols={config.cols}
              onCompletionChange={handleCompletionChange}
            />

            {completed && (
              <WinOverlay>
                <RetroWindow style={{ maxWidth: '400px', marginTop: 0 }}>
                  <WindowHeader>
                    <span>VICTORY.EXE</span>
                    <WindowIcons>
                      <FaWindowClose onClick={handlePlayAgain} />
                    </WindowIcons>
                  </WindowHeader>
                  <WindowContent>
                    <Title>PUZZLE COMPLETE!</Title>
                    <PreviewImage src={imageSrc} alt="Completed puzzle" />
                    <DiffButtonsContainer>
                      <ActionButton $primary onClick={handlePlayAgain} style={{ justifyContent: 'center' }}>
                        PLAY AGAIN
                      </ActionButton>
                      <ActionButton onClick={() => navigate('/photo')} style={{ justifyContent: 'center' }}>
                        BACK TO GALLERY
                      </ActionButton>
                    </DiffButtonsContainer>
                  </WindowContent>
                </RetroWindow>
              </WinOverlay>
            )}
          </div>
        )}
      </ContentArea>
    </PageContainer>
  );
}
