import s from "./Subscription.module.scss";

const Subscription = (props) => {
  return (
    <div className={s.subscription}>
      <div className={s.title}>
        <p>-----------------</p> оплатить подписку <p>-----------------</p>
      </div>
      <div className={s.inner}>
        <div className={s.item}>
          <div className={s.item__title}>standart</div>
          <div className={s.item__price}>50$</div>

          <div className={s.item__list}>
            <div className={s.item__list__subtitle}>режимы:</div>
            <div className={s.item__list__text}>
              - стандартный-межбиржевой
              <br />
              - конвертационный
              <br />
              <br />
              <br />
            </div>
          </div>

          <div className={s.item__list}>
            <div className={s.item__list__subtitle}>устройств:</div>
            <div className={s.item__list__text}>- 1</div>
          </div>

          <div className={s.item__list}>
            <div className={s.item__list__subtitle}>количество дней:</div>
            <div className={s.item__list__text}>- 30</div>
          </div>

          <div className={s.item__pros}>
            <div className={s.item__pros__box}>
              <div className={s.item__pros__subtitle}>+</div>
              <div className={s.item__pros__text}>закрытое комьюнити</div>
            </div>
            <div className={s.item__pros__box}>
              <div className={s.item__pros__subtitle}>+</div>
              <div className={s.item__pros__text}>поддержка 24/7</div>
            </div>
          </div>

          <div className={s.item__text}>
            весь необходимый функционал для работы со стандартными связками для
            одного человека с бюджетом до 200.000 рублей
          </div>

          <button className={s.item__button}>
            <div className={s.item__button__warp}>подключить</div>
            <div className={s.item__button__before}></div>
          </button>
        </div>

        <div className={s.item}>
          <div className={s.item__title}>pro</div>
          <div className={s.item__price}>100$</div>

          <div className={s.item__list}>
            <div className={s.item__list__subtitle}>режимы:</div>
            <div className={s.item__list__text}>
              - стандартный-межбиржевой
              <br />
              - конвертационный
              <br />
              - биржи + гарантекс
              <br />- Binance + BestChange
            </div>
          </div>

          <div className={s.item__list}>
            <div className={s.item__list__subtitle}>устройств:</div>
            <div className={s.item__list__text}>- 3</div>
          </div>

          <div className={s.item__list}>
            <div className={s.item__list__subtitle}>количество дней:</div>
            <div className={s.item__list__text}>- 30</div>
          </div>

          <div className={s.item__pros}>
            <div className={s.item__pros__box}>
              <div className={s.item__pros__subtitle}>+</div>
              <div className={s.item__pros__text}>закрытое комьюнити</div>
            </div>
            <div className={s.item__pros__box}>
              <div className={s.item__pros__subtitle}>+</div>
              <div className={s.item__pros__text}>поддержка 24/7</div>
            </div>
          </div>

          <div className={s.item__text}>
            профессиональная работа с более сложными связками, включающими обнал
            через Гарантекс, разные валюты, страны и так далее
          </div>

          <button disabled className={s.item__button}>
            <div className={s.item__button__warp}>подключить</div>
            <div className={s.item__button__before}></div>
          </button>
        </div>

        <div className={s.item}>
          <div className={s.item__title}>business</div>
          <div className={s.item__price}>200$</div>

          <div className={s.item__list}>
            <div className={s.item__list__subtitle}>режимы:</div>
            <div className={s.item__list__text}>
              - стандартный-межбиржевой
              <br />
              - конвертационный
              <br />
              - биржи + гарантекс
              <br />- Binance + BestChange
            </div>
          </div>

          <div className={s.item__list}>
            <div className={s.item__list__subtitle}>устройств:</div>
            <div className={s.item__list__text}>- по запросу</div>
          </div>

          <div className={s.item__list}>
            <div className={s.item__list__subtitle}>количество дней:</div>
            <div className={s.item__list__text}>- 30</div>
          </div>

          <div className={s.item__pros}>
            <div className={s.item__pros__box}>
              <div className={s.item__pros__subtitle}>+</div>
              <div className={s.item__pros__text}>закрытое комьюнити</div>
            </div>
            <div className={s.item__pros__box}>
              <div className={s.item__pros__subtitle}>+</div>
              <div className={s.item__pros__text}>поддержка 24/7</div>
            </div>
          </div>

          <div className={s.item__text}>
            решение для команд и p2p-офисов, суть которого заключается в
            предоставлении доступа оптом сразу нескольким сотрудникам
          </div>

          <button disabled className={s.item__button}>
            <div className={s.item__button__warp}>подключить</div>
            <div className={s.item__button__before}></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
